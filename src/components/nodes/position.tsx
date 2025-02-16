import React, { memo, useState, useRef } from "react";
import { Handle, Position, Node } from "reactflow";
import { IPortData } from "./model";

export const PositionNode = memo((node: Node) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [error, setError] = useState(false); // Track validation errors
  const { data } = node;

  // References to prevent continuous updates
  const xRef = useRef(null);
  const yRef = useRef(null);

  // Update values based on manual input
  const handleXChange = (e) => {
    const value = e.target.value;
    if (data.dataType === "int" && !/^\d*$/.test(value)) {
      setError(true);
      setX(Number(value));
      return;
    }
    setError(false);
    setX(Number(value));
  };

  return (
    <div className="grand-parent">
      <div className="w-[320px] h-[150px] rounded-full bg-gray-800 overflow-hidden border border-solid border-gray-700 shadow-md">
        
        {/* Blue Background with Overflow Hidden */}
        <div className="w-full bg-blue-300 text-black text-center font-semibold py-1 truncate">
          {data.dataType}
        </div>

        {/* Main Content */}
        <div className="px-2 py-3 flex justify-center">
          <div className="flex items-center mb-2 space-x-2">
            <label htmlFor="x" className="text-white text-sm mr-2">Value</label>
            <input
              ref={xRef}
              id="x"
              type="number"
              className={`p-1 text-black opacity-75 text-sm rounded-none w-20 text-center ${error ? 'bg-red-500 border-red-500' : 'bg-white border-gray-500'}`}
              value={x}
              onChange={handleXChange}
            />
          </div>
        </div>

        <div className="absolute bottom-[35%] right-5 transform translate-y-1/2 flex items-center space-x-3 z-10">
          <label htmlFor="y" className="text-white text-sm mr-2">Output</label>
          <input
            ref={yRef}
            id="y"
            className="p-1 text-black opacity-75 text-sm rounded-none w-10 text-center bg-white border-gray-500"
            value={y}
            onChange={(e) => setY(Number(e.target.value))}
          />
          <Handle
            type="target"
            id="output"
            position={Position.Right}
            className="!absolute !right-[-20px] !top-[50%] !translate-y-[-50%] z-10 circle-port ml-4 !bg-blue-300 !border-blue-300"
          />
        </div>
      </div>
    </div>
  );
});
