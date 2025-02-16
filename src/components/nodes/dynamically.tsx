import useStore from "@/config/store";
import { cn } from "@/lib/utils";
import React, { memo, useState } from "react";
import { Edge, Handle, Node, Position, getConnectedEdges } from "reactflow";
import { shallow } from "zustand/shallow";

const selector = (state: { edges: Edge[] }) => ({
  edges: state.edges,
});

export const DynamicNode = memo((node: Node) => {
  const { data, selected } = node;
  const { edges } = useStore(selector, shallow);
  const alledges = getConnectedEdges([node], edges);

  const [inputs, setInputs] = useState(data.inputs || []);
  const [outputs, setOutputs] = useState(data.outputs || []);
  const [encodingType, setEncodingType] = useState("Basis Encoding");

  const addVariable = () => {
    const newInputId = `input-${inputs.length + 1}`;
    const newOutputId = `output-${outputs.length + 1}`;

    setInputs([...inputs, { id: newInputId, label: `Variable ${inputs.length + 1}` }]);
    setOutputs([...outputs, { id: newOutputId, label: `Output ${outputs.length + 1}`, value: "" }]);
  };

  const handleOutputChange = (id, newValue) => {
    setOutputs(outputs.map(output => output.id === id ? { ...output, value: newValue } : output));
  };

  const baseHeight = 180;
  const extraHeightPerVariable = 40;
  const dynamicHeight = baseHeight + (inputs.length + outputs.length) * extraHeightPerVariable;

  return (
    <div className="grand-parent">
      <div
        className={cn(
          "w-[320px] bg-white border border-solid border-gray-700 shadow-md",
          selected && "border-blue-500"
        )}
        style={{ height: `${dynamicHeight}px` }}
      >
        <div className="w-full bg-green-300 text-black text-center font-semibold py-1 truncate">
          {data.label}
        </div>

        <div className="py-2 px-3 min-h-[32px]">
          <p className="text-xs whitespace-pre-wrap">{data.description || "No description"}</p>
        </div>

        <div className="custom-node-port-in space-y-2 px-3">
          {inputs.map((input, index) => (
            <div className="relative flex items-center space-x-2 overflow-visible" key={input.id}>
              <div>
                <Handle
                  type="target"
                  id={input.id}
                  position={Position.Left}
                  className="z-10 circle-port !bg-green-300 !border-green-300"
                  style={{ top: "12px" }}
                />

                <span className="text-black text-sm">{input.label}</span>
              </div>
            </div>
          ))}
          <button onClick={addVariable} className="add-variable-button mt-2 w-full bg-gray-300 py-1 rounded text-sm text-black">
            + Add More Variable
          </button>
        </div>


        <div className="px-3 py-1">
          <label className="text-black text-xs">Encoding Type:</label>
          <select
            className="w-full p-1 mt-1 bg-gray-700 text-white border border-gray-600 rounded"
            value={encodingType}
            onChange={(e) => setEncodingType(e.target.value)}
          >
            <option value="Basis Encoding">Basis Encoding</option>
            <option value="Amplitude Encoding">Amplitude Encoding</option>
          </select>
        </div>

        <div className="custom-node-port-out space-y-2 px-3">
          {outputs.map((output, index) => (
            <div className="relative flex items-center justify-end space-x-2 overflow-visible" key={output.id}>
              <div className="flex items-center space-x-2">
              <span className="text-black text-sm">{output.label}</span>
                <input
                  className="p-1 text-black opacity-75 text-sm w-16 text-center rounded-full border bg-white border-gray-500"
                  value={output.value}
                  placeholder="a"
                  onChange={(e) => handleOutputChange(output.id, e.target.value)}
                />
                <Handle
                  type="source"
                  id={output.id}
                  position={Position.Right}
                  className="z-10 circle-port-out !bg-green-300 !border-green-300"
                  style={{ top: "12px" }}
                />
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
