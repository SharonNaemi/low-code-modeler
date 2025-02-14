import useStore from "@/config/store";
import { cn } from "@/lib/utils";
import React, { memo, useState } from "react";
import { Edge, Handle, Node, Position, getConnectedEdges } from "reactflow";
import { shallow } from "zustand/shallow";
import { IPortData } from "./model";

const selector = (state: { edges: Edge[] }) => ({
  edges: state.edges,
});

export const TextNode = memo((node: Node) => {
  const { data, selected, id } = node;
  const { edges } = useStore(selector, shallow);
  const alledges = getConnectedEdges([node], edges);

  // Manage dynamic input/output variables
  const [inputs, setInputs] = useState<IPortData[]>(data.inputs || []);
  const [outputs, setOutputs] = useState<IPortData[]>(data.outputs || []);

  // Function to add new input/output dynamically
  const addVariable = () => {
    const newId = `var-${inputs.length + 1}`;
    setInputs([...inputs, { id: newId, label: `Variable ${inputs.length + 1}` }]);
    setOutputs([...outputs, { id: `out-${outputs.length + 1}`, label: `Output ${outputs.length + 1}` }]);
  };

  return (
    <div
      className={cn(
        "bg-white border-[1px] shadow-2xl border-transparent rounded-md min-w-[200px] text-start",
        selected && "border-blue-500"
      )}
    >
      <span className="py-1 px-3 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 block rounded-t-md">
        {data.label || "Text Node"}
      </span>

      <div className="py-2 px-3 min-h-[32px]">
        <p className="text-xs whitespace-pre-wrap">{data.description || "No description"}</p>
      </div>

      {/* Dynamic Input Ports */}
      <div className="custom-node-port-in">
        {inputs.map((input, index) => (
          <div className="custom-node-port custom-node-port-in" key={`input-${index}`}>
            {input.label}
            <Handle
              type="target"
              id={input.id}
              position={Position.Left}
              className="square-port square-port-left"
            />
          </div>
        ))}

        {/* "Add More Variable" Button */}
        <button onClick={addVariable} className="add-variable-button">
          + Add More Variable
        </button>
      </div>

      {/* Dynamic Output Ports */}
      <div className="custom-node-port-out">
        {outputs.map((output, index) => (
          <div className="custom-node-port custom-node-port-out" key={`output-${index}`}>
            {output.label}
            <Handle
              type="source"
              id={output.id}
              position={Position.Right}
              className="square-port square-port-right"
            />
          </div>
        ))}
      </div>
    </div>
  );
});
