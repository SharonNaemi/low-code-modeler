import useStore from "@/config/store";
import { cn } from "@/lib/utils";
import React, { memo, useState, useRef } from "react";
import { Edge, Handle, Node, Position, getConnectedEdges } from "reactflow";
import { shallow } from "zustand/shallow";

const selector = (state: { edges: Edge[] }) => ({
  edges: state.edges,
});

export const MeasurementNode = memo((node: Node) => {
  const { data, selected } = node;
  const { edges } = useStore(selector, shallow);
  const alledges = getConnectedEdges([node], edges);
  const [y, setY] = useState("");


  const [inputs, setInputs] = useState(data.inputs || []);
  const [outputs, setOutputs] = useState(data.outputs || []);
  const [encodingType, setEncodingType] = useState("Basis Encoding");
  const [error, setError] = useState(false);
  const [yError, setYError] = useState(false);

  const xRef = useRef(null);
  const yRef = useRef(null);

  const addVariable = () => {
    const newInputId = `input-${inputs.length + 1}`;
    const newOutputId = `output-${outputs.length + 1}`;
    node.data.test = "a";

    setInputs([...inputs, { id: newInputId, label: `Variable ${inputs.length + 1}` }]);
    setOutputs([...outputs, { id: newOutputId, label: `Output ${outputs.length + 1}`, value: "" }]);
  };


  const baseHeight = 140;
  const extraHeightPerVariable = 40;
  const dynamicHeight = baseHeight + (inputs.length) * extraHeightPerVariable;
  console.log(dynamicHeight)

  const handleYChange = (e) => {
    const value = e.target.value;
    // Check if the first character is a letter or underscore
    if (!/^[a-zA-Z_]/.test(value) || value == "") {
      setYError(true);
    } else {
      setYError(false);
    }

    setY(value);
  };

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
          Measurement
        </div>

        <div className="custom-node-port-in space-y-2 px-3 mb-3">
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


        <div className="custom-node-port-out">
                  <div className="relative flex items-center justify-end space-x-0 overflow-visible">
                    <div
                      className="flex items-center space-x-2 relative rounded-full"
                      style={{
                        backgroundColor: 'rgba(105, 145, 210, 0.2)',
                        width: '150px',
                      }}
                    >
                      <label htmlFor="y" className="text-sm text-black mr-2">Output</label>
                      <input
                        ref={yRef}
                        id="y"
                        className={`p-1 text-sm text-black opacity-75 w-10 text-center rounded-full border ${yError ? 'bg-red-500 border-red-500' : 'bg-white border-gray-500'}`}
                        value={y}
                        placeholder="a"
                        onChange={handleYChange}
                      />
                      <Handle
                        type="target"
                        id="output"
                        position={Position.Right}
                        className="z-10 classical-circle-port-out !bg-gray-300 !border-2 !border-dashed !border-black"
                      />
                    </div>
                  </div>
                </div>
      </div>
    </div>
  );
});
