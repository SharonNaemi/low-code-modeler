import { memo, useState, useRef, useEffect } from "react";
import { Handle, Position, Node, Edge, useUpdateNodeInternals } from "reactflow";
import { motion } from "framer-motion";
import useStore from "@/config/store";
import { shallow } from "zustand/shallow";
import { Button } from "antd";
import { cn } from "@/lib/utils";

const selector = (state: {
  selectedNode: Node | null;
  edges: Edge[];
  nodes: Node[];
  updateNodeValue: (nodeId: string, field: string, nodeVal: any) => void;
  setNodes: (node: Node) => void;
  setSelectedNode: (node: Node) => void;
}) => ({
  selectedNode: state.selectedNode,
  edges: state.edges,
  nodes: state.nodes,
  setNodes: state.setNodes,
  updateNodeValue: state.updateNodeValue,
  setSelectedNode: state.setSelectedNode,
});

export const ControlStructureNode = memo((node: Node) => {
  const [showingChildren, setShowingChildren] = useState(false);
  const { setNodes, updateNodeValue, setSelectedNode, edges } = useStore(selector, shallow);
  const updateNodeInternals = useUpdateNodeInternals();

  return (
    <motion.div
      className="grand-parent overflow-visible"
      initial={false}
      animate={{ width: showingChildren ? 360 : 700, height: showingChildren ? 400 : 503 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "visible", paddingLeft: "75px", minWidth: "700px", position: "relative" }}
    >
      <div className="rounded-none bg-white border border-solid border-gray-700 shadow-md relative w-full h-full relative flex items-center justify-center overflow-visible" style={{ overflow: "visible" }}>
        <div className="rounded-md bg-white border border-solid border-gray-700 shadow-md w-full h-full flex flex-col items-center relative z-10 overflow-visible" style={{ overflow: "visible" }}>
          <div className="w-full bg-blue-300 text-black text-center font-semibold py-1">
            <span className="text-sm">{node.data.label}</span>
          </div>

          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 overflow-visible text-center">
         
            <div style={{ position: "relative", width: "225px", overflow: "visible" }}>
              <div
                className="hexagon-left"
                style={{
                  position: "absolute",
                  left: "0",
                  width: "150px",
                  height: "150px",
                  backgroundColor: "#ff6347",
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
                }}
              >
                 <span className="text-sm">Repeat Start</span>
              </div>
              <div style={{ position: "absolute", left: "-75px", overflow: "visible" }}>
                
                <Handle
                  type="target"
                  id="classicalHandleInitialization"
                  position={Position.Left}
                  className="absolute z-10 classical-circle-port-in !bg-orange-300 !border-black"
                  style={{ top: "40px", overflow: "visible" }}
                  isConnectable={edges.filter((edge) => edge.target === node.id).length < 2}
                />
                  <Handle
                    type="target"
                    id="quantumHandleInitialization"
                    position={Position.Left}
                    className="z-10 circle-port-op !bg-blue-300 !border-black"
                    style={{ top: "70px", overflow: "visible" }}
                    isConnectable={edges.filter((edge) => edge.target === node.id).length < 2}
                  />
                  <Handle
                    type="target"
                    id="quantumHandleAdditional"
                    position={Position.Left}
                    className="z-10 circle-port-op !bg-blue-300 !border-black"
                    style={{ top: "100px", overflow: "visible" }}
                    isConnectable={edges.filter((edge) => edge.target === node.id).length < 2}
                  />
                  {edges.map((edge, i) => (
                    <Handle
                      id={edge.targetHandle}
                      key={edge.id + edge.targetHandle}
                      type="target"
                      position={Position.Left}
                      style={{ top: i * 20, background: "#555" }}
                      isConnectable={edges.filter((edge) => edge.target === node.id).length < 2}
                    />
                  ))}
                
                </div>
              </div>
            </div>

            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hexagon-right z-20">
              <span className="text-sm">Repeat End</span>
              <Handle type="source" position={Position.Right} className="z-10 !bg-blue-300 !border-black" />
            </div>
          </div>
        </div>

        <Button
          onClick={() => setShowingChildren(!showingChildren)}
          icon={showingChildren ? "-" : "+"}
          style={{
            position: "absolute",
            bottom: "0px",
            left: "50%",
            transform: "translateX(-50%)",
            border: "1px solid black",
            borderRadius: 0,
            zIndex: 30,
          }}
        />
    </motion.div>
  );
});