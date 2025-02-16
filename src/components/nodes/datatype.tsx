import useStore from "@/config/store";
import { cn } from "@/lib/utils";
import React, { memo } from "react";
import { Edge, Handle, Node, Position, getConnectedEdges } from "reactflow";
import { shallow } from "zustand/shallow";
import { IPortData } from "./model";

const selector = (state: { edges: Edge[] }) => ({
  edges: state.edges,
});

export const DataTypeNode = memo((node: Node) => {
  const [sourceConnectable, setSourceConnectable] = React.useState(true);
  const { data, selected, id } = node;
  const { edges } = useStore(selector, shallow);
  const alledges = getConnectedEdges([node], edges);

  React.useEffect(() => {
    alledges.forEach((edge) => {
      if (edge.source === id) {
        setSourceConnectable(false);
        return;
      }
    });
  }, [alledges, id]);

  return (
    <div
      className={cn(
        "w-[320px] h-[100px] rounded-[50px] border-2 border-black flex flex-col items-center justify-between shadow-lg transition-all duration-200 px-4 relative", // Parent container with black border
        selected && "border-2 border-blue-500"
      )}
    >
      {/* Top part with blue background */}
      <div className="w-full bg-blue-300 flex items-center justify-center rounded-t-[50px] py-2 relative">
        <span className="text-xs font-semibold text-black">{data.dataType}</span>
      </div>

      {/* Underline */}
      <div className="w-full h-[1px] bg-black"></div> {/* Line between sections */}

      {/* Bottom part with white background and input */}
      <div className="w-full bg-white flex flex-col items-center py-2">
        <input
          type="text"
          defaultValue={5}
          className="w-full px-2 py-1 text-gray-500 border border-gray-400 rounded text-center"
          title="5"
        />
      </div>
    </div>
  );
});

