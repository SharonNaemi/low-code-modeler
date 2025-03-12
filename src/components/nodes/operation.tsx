import useStore from "@/config/store";
import { cn } from "@/lib/utils";
import React, { memo, useState } from "react";
import { Edge, Handle, Node, Position, getConnectedEdges } from "reactflow";
import { shallow } from "zustand/shallow";

const selector = (state: { edges: Edge[] }) => ({
  edges: state.edges,
});

export const OperationNode = memo((node: Node) => {
  const { data, selected } = node;
  const { edges } = useStore(selector, shallow);
  const alledges = getConnectedEdges([node], edges);

  const [inputs, setInputs] = useState(data.inputs || []);
  const [outputs, setOutputs] = useState(data.outputs || []);
  const [encodingType, setEncodingType] = useState("Basis Encoding");
  const [yError, setYError] = useState(false);
  const [y, setY] = useState("");
  const [outputIdentifierError, setOutputIdentifierError] = useState(false);
  const [outputIdentifier, setOutputIdentifier] = useState("");
  const [operation, setOperation] = useState("");

  const addVariable = () => {
    const newInputId = `input-${inputs.length + 1}`;
    const newOutputId = `output-${outputs.length + 1}`;

    setInputs([...inputs, { id: newInputId, label: `Variable ${inputs.length + 1}` }]);
    setOutputs([...outputs, { id: newOutputId, label: `Output ${outputs.length + 1}`, value: "" }]);
  };

  const handleOutputChange = (id, newValue) => {
    setOutputs(outputs.map(output => output.id === id ? { ...output, value: newValue } : output));
  };
  const handleYChange = (e, field) => {
    const value = e.target.value;
    if (!/^[a-zA-Z_]/.test(value) && value !== "") {
      setYError(true);
    } else {
      setYError(false);
    }
    setY(value);
  };
  const handleOutputIdentifierChange = (e, field) => {
    const value = e.target.value;

    // Check if the first character is a number
    if (/^\d/.test(value)) {
      setOutputIdentifierError(true);
    } else {
      setOutputIdentifierError(false);
    }

    node.data[field] = value;
    updateNodeValue(node.id, field, value);
    setSelectedNode(node);
  };

  const baseHeight = 360;
  const extraHeightPerVariable = 20;
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
        <div className="px-3 py-1 mb-1">
          <label className="text-sm text-black">Operator:</label>
          <select
            className="w-full p-1 mt-1 bg-white text-center text-sm text-black border-2 border-blue-300 rounded-full"
            value={node.data.operator || operation}
            onChange={(e) => handleYChange(e, "operator")}
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="/">/</option>
            <option value="*">*</option>
            <option value="**">**</option>
          </select>
        </div>
        
        <div className="custom-node-port-in mb-3 mt-2">
          <div className="relative flex flex-col space-y-4 overflow-visible">
            <div className="relative flex items-center">
              <Handle
                type="target"
                id="quantumHandleOperation1"
                position={Position.Left}
                className="z-10 circle-port-op !bg-green-300 !border-black"
              />
              <span className="ml-4 text-black text-sm">Input 1</span>
            </div>
            <div className="relative flex items-center">
              <Handle
                type="target"
                id="quantumHandleOperation2"
                position={Position.Left}
                className="z-10 circle-port-op !bg-green-300 !border-black"
              />
              <span className="ml-4 text-black text-sm">Input 2</span>
            </div>
            <div className="relative flex items-center">
              <Handle
                type="source"
                id="ancilla"
                position={Position.Left}
                className="z-10 classical-circle-port-op !bg-gray-500 !border-black w-4 transform rotate-45"
              />
              <span className="ml-4 text-black text-sm">Ancilla</span>
            </div>
          </div>
        </div>
        
        <button onClick={addVariable} className="add-variable-button mt-2 w-full bg-gray-300 py-1 rounded text-sm text-black">
          + Add More Variables
        </button>
        
        <div className="custom-node-port-out">
          <div className="relative flex items-center justify-end space-x-0 overflow-visible">
            <div
              className="flex items-center space-x-2 relative"
              style={{
                backgroundColor: 'rgba(124, 202, 154, 0.2)',
                width: '150px',
              }}
            >
              <label htmlFor="outputIdentifier" className="text-sm text-black mr-2">Output</label>
              <input
                id="outputIdentifier"
                className={`p-1 text-sm text-black opacity-75 w-10 text-center rounded-none border 
    ${outputIdentifierError ? 'bg-red-500 border-red-500' : 'bg-white border-gray-500'}`}
                value={node.data.outputIdentifier || outputIdentifier}
                placeholder="a"
                onChange={e => handleOutputIdentifierChange(e, "outputIdentifier")}
              />

              <Handle
                type="source"
                id="quantumHandleStatePreparationOutput"
                position={Position.Right}
                className="z-10 circle-port-out !bg-green-300 !border-black"
                isValidConnection={(connection) => true}
              />
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-end space-x-0 overflow-visible mt-2">
          <div className="flex items-center space-x-2 relative" style={{ backgroundColor: 'rgba(124, 202, 154, 0.2)', width: '150px' }}>
            <span className="text-sm text-black mr-2">Uncompute</span>

            <Handle
              type="source"
              id="quantumHandleUncomputeStatePreparation"
              position={Position.Right}
              className="z-10 circle-port-out !bg-green-300 !border-black"
              isValidConnection={() => true}
            />
          </div>
        </div>
      </div>
    </div>
  );

});