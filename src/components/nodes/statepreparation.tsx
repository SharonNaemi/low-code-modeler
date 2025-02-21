import React, { memo, useState, useRef } from "react";
import { Handle, Position, Node } from "reactflow";

export const StatePreparationNode = memo((node: Node) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState("");
  const [error, setError] = useState(false);
  const [yError, setYError] = useState(false);
  const { data } = node;
  const [encodingType, setEncodingType] = useState("Basis Encoding");

  const xRef = useRef(null);
  const yRef = useRef(null);

  const handleXChange = (e) => {
    const value = e.target.value;
    if (value === "" ||
      (data.dataType === "int" && !/^\d*$/.test(value)) ||
      (/[.,]/.test(value) && data.dataType === "int")
    ) {
      setError(true);
      setX(value);
      return;
    }
    setError(false);
    setX(value);
  };

  const handleYChange = (e) => {
    const value = e.target.value;
    if (!/^[a-zA-Z_]/.test(value) && value !== "") {
      setYError(true);
    } else {
      setYError(false);
    }
    setY(value);
  };

  return (
    <div className="grand-parent">
      <div className="w-[320px] h-[180px] rounded-none bg-white border border-solid border-gray-700 shadow-md">
        {/* Header Section */}
        <div className="w-full bg-green-300 text-black text-center font-semibold py-1 truncate flex items-center justify-center space-x-2">
          <span className="text-sm">State Preparation</span>
        </div>

        {/* Encoding Type Selection */}
        <div className="px-3 py-1 mb-1">
          <label className="text-sm text-black">Encoding Type:</label>
          <select
            className="w-full p-1 mt-1 bg-white text-sm text-black border border-gray-600 rounded"
            value={encodingType}
            onChange={(e) => setEncodingType(e.target.value)}
          >
            <option value="Basis Encoding">Basis Encoding</option>
            <option value="Amplitude Encoding">Amplitude Encoding</option>
            <option value="Angle Encoding">Angle Encoding</option>
            <option value="Matrix Encoding">Matrix Encoding</option>
          </select>
        </div>

        {/* Input Port Section */}
        <div className="custom-node-port-in mb-3">
          <div className="relative flex items-center justify-between text-sm text-black py-1 px-3 rounded-full" style={{ backgroundColor: 'rgba(105, 145, 210, 0.2)' }}>
            <Handle
              type="target"
              id="input"
              position={Position.Left}
              className="z-10 classical-circle-port-in !bg-blue-300 !border-black"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            />
            <span className="pl-3">Input</span>
            <Handle
              type="target"
              id="output"
              position={Position.Right}
              className="z-10 classical-circle-port-out !bg-blue-300 !border-black"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            />
          </div>
        </div>

        {/* Output Port Section */}
        <div className="custom-node-port-out">
          <div className="relative flex items-center justify-end space-x-0 overflow-visible">
            <div
              className="flex items-center space-x-2 relative"
              style={{
                backgroundColor: 'rgba(124, 202, 154, 0.2)',
                width: '150px',
              }}
            >
              <label htmlFor="y" className="text-sm text-black mr-2">Output</label>
              <input
                ref={yRef}
                id="y"
                className={`p-1 text-sm text-black opacity-75 w-10 text-center rounded-none border ${yError ? 'bg-red-500 border-red-500' : 'bg-white border-gray-500'}`}
                value={y}
                placeholder="a"
                onChange={handleYChange}
              />
              <Handle
                type="target"
                id="output"
                position={Position.Right}
                className="z-10 circle-port-out !bg-green-300 !border-green-300 !border-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
