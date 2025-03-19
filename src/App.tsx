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
import CustomEdge from "./components/edges/custom";


const selector = (state: {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
  onConnectEnd: any;
  setSelectedNode: (node: Node | null) => void;
  updateNodeValue: (nodeId: string, field: string, nodeVal: string) => void;
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
  onConnectEnd: state.onConnectEnd,
  setSelectedNode: state.setSelectedNode,
  updateNodeValue: state.updateNodeValue,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  undo: state.undo,
  redo: state.redo,
});

function App() {
  const reactFlowWrapper = React.useRef<any>(null);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<any>(null);
  const [metadata, setMetadata] = React.useState<any>({
    version: "1.0.0",
    name: "My Model",
    description: "This is a model.",
    author: "",
  });
  const [menu, setMenu] = useState(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [nisqAnalyzerEndpoint, setNisqAnalyzerEndpoint] = useState("http://localhost:8098/nisq-analyzer");
  const [qunicornEndpoint, setQunicornEndpoint] = useState("http://localhost:5005");
  const [lowcodeBackendEndpoint, setLowcodeBackendEndpoint] = useState("http://localhost:8000");
  const [isLoadJsonModalOpen, setIsLoadJsonModalOpen] = useState(false);

  const handleLoadJson = () => {
    setIsLoadJsonModalOpen(true);
  };

  const confirmLoadJson = () => {
    setIsLoadJsonModalOpen(false);
    loadFlow(initialDiagram);
  };

  const cancelLoadJson = () => {
    setIsLoadJsonModalOpen(false);
  };


  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onConnectEnd,
    setSelectedNode,
    setNodes,
    updateNodeValue,
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
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const sendToBackend = async () => {
    setModalOpen(true);
    setLoading(true);

    try {

      // must return the location where to poll
      let response = await fetch(lowcodeBackendEndpoint + "/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reactFlowInstance.toObject()),
      });

      if (!response["Location"]) {
        return {
          error: "Received invalid response from Low Code Backend.",
        };
      }
      //pollStatus(response["Location"]);
    } catch (error) {
      console.error("Error sending data:", error);
      setLoading(false);
    }
  };

  const pollStatus = async () => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(lowcodeBackendEndpoint + "/status");
        const result = await response.json();
        setStatus(result);

        if (result.status === "complete") {
          clearInterval(interval);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error polling status:", error);
        clearInterval(interval);
        setLoading(false);
      }
    }, 3000);
  };


  const onNodeDragStop = useCallback(

    /**
     * 
     * @param evt {
        id: (nds.length + 1).toString(),
        type: "custom",
        position: { x: Math.random() * 100, y: Math.random() * 100 }, // Random position inside the parent
        data: { label: `Child ${nds.length}` },
        parentNode: parentId, // Link it to the parent
        extent: "parent", // Keeps child within parent bounds
      },
     * @param node 
     * @returns 
     */
    (evt, node) => {
      if (node.type === "group") {
        return;
      }
      console.log("onNodeDrag");
      console.log(node);
      let nodeT = nodes[0];
      nodes.forEach((nd) => {
        // Check if there's a group node in the array of nodes on the screen
        if (nd.type === "statePreparationNode") {
          //safety check to make sure there's a height and width
          console.log(node);
          console.log(nd.id);
          let intersectionNodes = reactFlowInstance.getIntersectingNodes(node).map((n) => n.id);
          console.log(intersectionNodes)

          // Check if the dragged node is inside the group
          if (intersectionNodes[0] == nd.id) {
            console.log(nd);
            const rec = { height: nd.height, width: nd.width, ...nd.position };

            //Check if dragged node isn't already a child to the group
            if (!node.parentNode) {
              console.log("update node")
              node.parentNode = nd.id;
              node.extent = "parent";

              node.position = {
                x: node.positionAbsolute.x - nd.position.x,
                y: node.positionAbsolute.y - nd.position.y,
              };
              console.log(node);
              nodeT = node;
              updateNodeValue(node.id, "parentNode", nd.id);
              updateNodeValue(node.id, "position", node.position);
            }
          }
        }
      });
      //setNodes(nodeT);
    }, [nodes]);

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
    console.log(flow);
    const validMetadata = {
      ...metadata,
      id: `flow-${Date.now()}`,
      timestamp: new Date().toISOString(),
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
            reactFlowInstance.setNodes(
              flow.nodes.map((node: Node) => ({
                ...node,
                data: {
                  ...node.data,
                },
              }))
            );
            console.log("Nodes restored.");
          }

          const { x = 0, y = 0, zoom = 1 } = flow.viewport || {};
          reactFlowInstance.setViewport({ x, y, zoom });

          if (flow.metadata) {
            setMetadata(flow.metadata);
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

  //const handleLoadJson = () => {
  //setIsModalOpen(true);
  //loadFlow(initialDiagram);
  //};

  //const confirmLoadJson = () => {
  // setIsModalOpen(false);
  //loadFlow(initialDiagram);
  //};


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

  const overlappingNodeRef = useRef<Node | null>(null);


  const onNodeDrag = React.useCallback((_: React.MouseEvent, node: Node, nodes: Node[]) => {
    console.log(reactFlowInstance)
    const intersections = reactFlowInstance.getIntersectingNodes(node).map((n) => n.id);
    console.log(intersections)
    //updateNodeValue(node.id, "parentNode", intersections)
    console.log("trest")
    console.log(intersections)
  }
    , [reactFlowInstance]);

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
        sendToBackend={sendToBackend}
      />
      <Modal open={isLoadJsonModalOpen} onClose={cancelLoadJson}>
        <div>
          <h2 className="text-lg font-semibold">New Diagram</h2>
          <p>Are you sure you want to create a new model? This will overwrite the current flow.</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button className="btn btn-primary" onClick={confirmLoadJson}>Yes</button>
            <button className="btn btn-secondary" onClick={cancelLoadJson}>Cancel</button>

          </div>
        </div>
      </Modal>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <h2>Processing</h2>
          {loading ? <p>Loading...</p> : <p>Status: {status?.status || "Unknown"}</p>}
        </div>
      </Modal>
      <Modal open={isConfigOpen} onClose={() => { setIsConfigOpen(false) }}>
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
                    value={qunicornEndpoint}
                    onChange={(event) => setQunicornEndpoint(event.target.value)}
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
                    value={lowcodeBackendEndpoint}
                    onChange={(event) => setLowcodeBackendEndpoint(event.target.value)}
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
            onConnectEnd={onConnectEnd}
            onConnect={onConnect}
            onPaneClick={onPaneClick}
            onDragOver={onDragOver}
            onNodeDrag={onNodeDrag}
            onNodeDragStop={onNodeDragStop}
            onDrop={onDrop}
            fitView
            fitViewOptions={{ maxZoom: 1 }}
            onInit={setReactFlowInstance}
            snapToGrid={true}
            nodeTypes={nodesConfig.nodeTypes}
            edgeTypes={nodesConfig.edgesTypes}
          >
            <Controls />

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
