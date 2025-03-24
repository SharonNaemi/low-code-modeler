import { memo, useState, useRef } from "react";
import { Handle, Position, Node, useUpdateNodeInternals } from "reactflow";
import useStore from "@/config/store";
import { shallow } from "zustand/shallow";

const selector = (state: {
  selectedNode: Node | null;
  updateNodeValue: (nodeId: string, field: string, nodeVal: string) => void;
  setSelectedNode: (node: Node | null) => void;
}) => ({
  selectedNode: state.selectedNode,
  updateNodeValue: state.updateNodeValue,
  setSelectedNode: state.setSelectedNode
});

export const GateNode = memo((node: Node) => {

  const { data } = node;
  const isTwoQubit = data.label === "CNOT";


  return (
    <div className="grand-parent">
      <div className="w-[100px] h-[100px] rounded-none bg-white overflow-hidden border border-solid border-gray-700 shadow-md">
        <div className="w-full bg-blue-300 text-black text-center font-semibold py-1 truncate">
          Gate
        </div>
        <div className="px-2 py-3 flex justify-center">
          <div className="flex items-center mb-2">
            <Handle
              type="target"
              id="classicalHandleDataTypeInput"
              position={Position.Left}
              className={`!absolute !top-[${isTwoQubit ? "55%" : "65%"}] z-10 circle-port-op !bg-blue-300 !border-black overflow-visible`}
              isValidConnection={(connection) => true}
            />
            {isTwoQubit && (
            <Handle
              type="target"
              id="left-bottom"
              position={Position.Left}
              className="!absolute !top-[85%] z-10 circle-port-op !bg-blue-300 !border-black overflow-visible"
              isValidConnection={(connection) => true}
            />
          )}
            <div className="absolute top-[65%]  -translate-x-1/2 -translate-y-1/2 text-center">
              {data.label}
            </div>
            <Handle
              type="source"
              id="classicalHandleDataType"
              position={Position.Right}
              className={`!absolute !top-[${isTwoQubit ? "55%" : "65%"}] z-10 circle-port-out !bg-blue-300 !border-black overflow-visible`}
    
              isValidConnection={(connection) => true}
            />
            {isTwoQubit && (<Handle
              type="source"
              id="classicalHandleDataType"
              position={Position.Right}
              className="!absolute !top-[85%] z-10 circle-port-out !bg-blue-300 !border-black overflow-visible"
              isValidConnection={(connection) => true}
            />)}
          </div>
        </div>
      </div>
    </div>
  );
});
