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
  const [indices, setIndices] = useState("");

  const xRef = useRef(null);
  const yRef = useRef(null);

  const addVariable = () => {
    const newInputId = `input-${inputs.length + 1}`;
    const newOutputId = `output-${outputs.length + 1}`;
    node.data.test = "a";

    setInputs([...inputs, { id: newInputId, label: `Variable ${inputs.length + 1}` }]);
    setOutputs([...outputs, { id: newOutputId, label: `Output ${outputs.length + 1}`, value: "" }]);
  };


  const baseHeight = 250;
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

        <div className="px-2 py-3 flex justify-center">
          <div className="flex items-center mb-2">
            <label htmlFor="x" className="text-black text-sm mr-2">Indices</label>
              <input
                ref={xRef}
                id="x"
                type="text"
                className={`p-1 text-black opacity-75 text-sm rounded-full w-24 text-center border-2 ${error ? 'bg-red-500 border-red-500' : 'bg-white border-blue-300'}`}
                value={node.data.indices || indices}
                placeholder="1,2,3"
                onChange={e=>e}
              />
            </div>

            </div>
        <div className="custom-node-port-in mb-3 mt-2">
       
        <div className="relative flex flex-col items-start text-black text-center overflow-visible">
          <div style={{ padding: "4px" }}>

            <div className="flex items-center space-x-2 mt-2" style={{ backgroundColor: "rgba(105, 145, 210, 0.2)"}}>
              <Handle
                type="target"
                id={`quantumHandleMeasurement${node.id}`}
                position={Position.Left}
                className="z-10 circle-port-op !bg-green-300 !border-black"
                style={{ top: "20px" }} 
                isValidConnection={(connection) => true}
              />
              <span className="text-black text-sm" >value(s)</span>
            </div>
            </div>
            </div>
          <button onClick={addVariable} className="add-variable-button mt-2 w-full bg-gray-300 py-1 rounded text-sm text-black">
            + Add More Variables
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
                value={node.data.outputIdentifier || y}
                placeholder="a"
                onChange={handleYChange}
              />
              <Handle
                type="target"
                id={`classicalHandle${node.id}`}
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
