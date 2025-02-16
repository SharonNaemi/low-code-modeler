import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  ReactFlowProvider,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { Panel, Palette, ContextMenu } from "./components";
import Toolbar from "./components/toolbar";
import { nodesConfig } from "./config/site";
import useStore from "./config/store";
import { useShallow } from "zustand/react/shallow";
import { handleDragOver, handleOnDrop } from "./lib/utils";
import useKeyBindings from "./hooks/useKeyBindings";
import { toSvg } from "html-to-image";
import { initialDiagram } from "./config/site";
import Modal from "./Modal";
import './index.css';


const selector = (state: {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
  setSelectedNode: (node: Node | null) => void;
  setNodes: (node: Node) => void;
  setEdges: (edge: Edge) => void;
  undo: () => void;
  redo: () => void;
}) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setSelectedNode: state.setSelectedNode,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  undo: state.undo,
  redo: state.redo,
});

function App() {
  const reactFlowWrapper = React.useRef<any>(null);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<any>(null);
  const [metadata, setMetadata] = React.useState<any>(null);
  const [menu, setMenu] = useState(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [nisqAnalyzerEndpoint, setNisqAnalyzerEndpoint] = useState("http://localhost:8098/nisq-analyzer");
  const [qprovEndpoint, setQProvEndpoint] = useState("http://localhost:5005");
  const [scriptSplitterEndpoint, setScriptSplitterEndpoint] = useState("http://localhost:8891")

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    setNodes,
    setEdges,
  } = useStore(useShallow(selector));

  const { undo } = useStore((state) => ({
    undo: state.undo,
  }));

  const { redo } = useStore((state) => ({
    redo: state.redo,
  }));

  const ref = useRef(null);

  const onDragOver = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      handleDragOver(event);
    },
    [],
  );

  const onDrop = React.useCallback(
    (event: any) => {
      console.log("dropped")
      console.log(reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      }));
      handleOnDrop(event, reactFlowWrapper, reactFlowInstance, setNodes);
    },
    [reactFlowInstance, setNodes],
  );

  const flowKey = "example-flow";
  function handleSaveClick() {
    if (!reactFlowInstance) {
      console.error("React Flow instance is not initialized.");
      return;
    }
    console.log("davor");
    const flow = reactFlowInstance.toObject();
    console.log("Ivh eill spiechern");
    console.log(flow);

    const validMetadata = metadata || {
      version: "1.0.0", // Default version
      name: "My Flow", // Default name
      id: `flow-${Date.now()}`, // Unique ID, e.g., based on timestamp
      description: "This is a description of the flow.", // Default description
      timestamp: new Date().toISOString(), // Current timestamp in ISO format
      author: "Sharon", // Default author
    };
    console.log(validMetadata);
    console.log(metadata);

    const flowWithMetadata = { metadata: validMetadata, ...flow };

    localStorage.setItem(flowKey, JSON.stringify(flowWithMetadata));
    console.log("Flow saved:", flowWithMetadata);
    // Create a downloadable JSON file
    const jsonBlob = new Blob([JSON.stringify(flowWithMetadata, null, 2)], {
      type: "application/json",
    });
    const downloadUrl = URL.createObjectURL(jsonBlob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${validMetadata.name.replace(/\s+/g, "_")}_${validMetadata.id}.json`; // Use metadata for file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  }
  function handleMetadataUpdate(updatedMetadata: any) {
    setMetadata(updatedMetadata);
  }

  function handleRestoreClick() {
    if (!reactFlowInstance) {
      console.error("React Flow instance is not initialized.");
      return;
    }

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";

    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (!file) {
        console.warn("No file selected.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const flow = JSON.parse(e.target?.result as string);

          console.log("Restoring flow:", flow);

          if (flow.edges) {
            reactFlowInstance.setEdges(flow.edges || []);
            console.log("Edges restored.");
          }

          if (flow.nodes) {
            reactFlowInstance.setNodes(flow.nodes || []);
            console.log("Nodes restored.");
          }

          const { x = 0, y = 0, zoom = 1 } = flow.viewport || {};
          reactFlowInstance.setViewport({ x, y, zoom });

          if (flow.metadata) {
            setMetadata(flow.metadata); // Set metadata to be displayed
            console.log("Metadata restored:", flow.metadata);
          }
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert("Invalid JSON file. Please ensure it is a valid flow file.");
        }
      };

      reader.onerror = (err) => {
        console.error("Error reading file:", err);
        alert("Failed to read file. Please try again.");
      };

      reader.readAsText(file);
    };

    fileInput.click();
  }

  useKeyBindings({ undo, redo });

  const handleClick = React.useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Prevent the default action (if any)
      event.preventDefault();

      // Set the selected node
      setSelectedNode(node);

      // Get the bounding rectangle of the ReactFlow pane to position the menu
      const pane = ref.current?.getBoundingClientRect();

      // Calculate the position of the context menu relative to the node
      // Here we add an offset (e.g., 10px) to position the menu next to the node.
      const menuTop = node.position.y + 10; // 10px below the node
      const menuLeft = node.position.x + 10; // 10px to the right of the node

      // Ensure the menu stays within the visible area of the pane
      const top =
        menuTop < (pane?.height || 0) - 200
          ? menuTop
          : (pane?.height || 0) - 200;
      const left =
        menuLeft < (pane?.width || 0) - 200
          ? menuLeft
          : (pane?.width || 0) - 200;

      // Set the position of the context menu
      setMenu({
        id: node.id,
        top,
        left,
        right: 0, // Not needed here since we use `left`
        bottom: 0, // Not needed here since we use `top`
      });
    },
    [setMenu, setSelectedNode],
  );

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleLoadJson = () => {
    setIsModalOpen(true);
  };

  const confirmLoadJson = () => {
    setIsModalOpen(false);
    loadFlow(initialDiagram);
  };


  //const handleLoadJson = () => {
  //if (
  //window.confirm(
  //"Are you sure you want to create a new model? This will overwrite the current flow."
  //)
  //) {
  // Load the initialDiagram after confirmation
  //loadFlow(initialDiagram);
  //}
  //};
  // Function to load the flow
  const loadFlow = (flow: any) => {
    if (!reactFlowInstance) {
      console.error("React Flow instance is not initialized.");
      return;
    }

    if (flow.initialEdges) {
      reactFlowInstance.setEdges(flow.initialEdges);
      console.log("Edges loaded.");
    }

    if (flow.initialNodes) {
      reactFlowInstance.setNodes(flow.initialNodes);
      console.log("Nodes loaded.");
    }

    // Reset the viewport (optional based on your use case)
    const { x = 0, y = 0, zoom = 1 } = flow.viewport || {};
    reactFlowInstance.setViewport({ x, y, zoom });

    // Set the metadata (if any) - assuming initialDiagram has metadata
    if (flow.metadata) {
      setMetadata(flow.metadata);
      console.log("Metadata loaded:", flow.metadata);
    }
  };

  const onPaneClick = useCallback(() => {
    setMenu(null);
    setSelectedNode(null);
    console.log("reset");
  }, [setMenu, setSelectedNode]);

  const handleOpenConfig = () => setIsConfigOpen(true);
  const handleCloseConfig = () => setIsConfigOpen(false);
  const handleSaveConfig = (config: {
    patternRepo: string;
    solutionRepo: string;
    backendURL: string;
  }) => {
    console.log("Configuration Saved:", config);
  };
  const handleSaveAsSVG = () => {
    if (ref.current === null) {
      console.error("React Flow container reference is null.");
      return;
    }

    toSvg(ref.current, {
      filter: (node) =>
        !node?.classList?.contains("react-flow__minimap") &&
        !node?.classList?.contains("react-flow__controls"),
    })
      .then((dataUrl) => {
        const a = document.createElement("a");
        a.setAttribute("download", "reactflow-diagram.svg");
        a.setAttribute("href", dataUrl);
        a.click();
      })
      .catch((err) => console.error("Error exporting SVG:", err));
  };

  return (
    <ReactFlowProvider>
      <Toolbar
        onSave={handleSaveClick}
        onRestore={handleRestoreClick}
        onSaveAsSVG={handleSaveAsSVG}
        onOpenConfig={handleOpenConfig}
        onLoadJson={handleLoadJson}
      />
      <Modal open={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
        <div>
          <h2 className="text-lg font-semibold">Config Modal</h2>
          <h3>NISQ Analyzer</h3>
          <table className="config-table">
            <tbody>
              <tr>
                <td align="right">NISQ Analyzer Endpoint:</td>
                <td align="left">
                  <input
                    className="qwm-input"
                    type="text"
                    value={nisqAnalyzerEndpoint}
                    onChange={(event) => setNisqAnalyzerEndpoint(event.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Qunicorn</h3>
          <table className="config-table">
            <tbody>
              <tr>
                <td align="right">Qunicorn Endpoint:</td>
                <td align="left">
                  <input
                    className="qwm-input"
                    type="text"
                    value={qprovEndpoint}
                    onChange={(event) => setQProvEndpoint(event.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Low-Code Backend:</h3>
          <table className="config-table">
            <tbody>
              <tr>
                <td align="right">Low-Code Backend Endpoint:</td>
                <td align="left">
                  <input
                    className="qwm-input"
                    type="text"
                    value={scriptSplitterEndpoint}
                    onChange={(event) => setScriptSplitterEndpoint(event.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>

      <main className="flex">
        <div className="hidden basis-[300px] md:block lg:basis-[350px]">
          <Palette />
        </div>
        <div
          className="h-[calc(100vh_-_48px)] flex-grow"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            ref={ref}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={(event: React.MouseEvent, node: Node) => {
              handleClick(event, node);
            }}
            onConnect={onConnect}
            onPaneClick={onPaneClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            fitView
            fitViewOptions={{ maxZoom: 1 }}
            onInit={setReactFlowInstance}
            snapToGrid={true}
            nodeTypes={nodesConfig.nodeTypes}
          >
            <Controls />
            {menu && <ContextMenu onClick={handleMetadataUpdate} {...menu} />}
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />

            <MiniMap zoomable={true} pannable={true} />
          </ReactFlow>
        </div>
        <div className="hidden basis-[300px] md:block lg:basis-[350px]">
          <Panel metadata={metadata} onUpdateMetadata={setMetadata} />
        </div>
      </main>
    </ReactFlowProvider>
  );
}

export default App;
