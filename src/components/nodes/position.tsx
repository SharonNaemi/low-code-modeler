import React, { memo, useState, useRef } from "react";
import { Handle, Position, Node } from "reactflow";
import { IPortData } from "./model";

export const PositionNode = memo((node: Node) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState("");

  const [error, setError] = useState(false);
  const [yError, setYError] = useState(false);
  const { data } = node;

  const xRef = useRef(null);
  const yRef = useRef(null);

  const handleXChange = (e) => {
    const value = e.target.value;
    console.log(value);

    // Check if value contains a float when it shouldn't or if it's not a number when required
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
    // Check if the first character is a letter or underscore
    if (!/^[a-zA-Z_]/.test(value) && value !== "") {
      setYError(true);
    } else {
      setYError(false);
    }

    setY(value);
  };

  return (
    <div className="grand-parent">
      <div className="w-[320px] h-[150px] rounded-full bg-white overflow-hidden border border-solid border-gray-700 shadow-md">
        <div className="w-full bg-blue-300 text-black text-center font-semibold py-1 truncate">
          {data.dataType}
        </div>
        <div className="px-2 py-3 flex justify-center">
          <div className="flex items-center mb-2">
            <label htmlFor="x" className="text-black text-sm mr-2">Value</label>
            <input
              ref={xRef}
              id="x"
              type="number"
              className={`p-1 text-black opacity-75 text-sm rounded-none w-20 rounded-full text-center border ${error ? 'bg-red-500 border-red-500' : 'bg-white border-gray-500'}`}
              value={x}
              placeholder="0"
              step={data.dataType === "int" ? 1 : 0.1}
              onChange={handleXChange}
            />
          </div>
        </div>

        <div className="absolute bottom-[35%] right-5 transform translate-y-1/2 flex items-center z-10">
          <label htmlFor="y" className="text-black text-sm mr-2">Output</label>
          <input
            ref={yRef}
            id="y"
            className={`p-1 text-black opacity-75 text-sm w-10 text-center rounded-full border ${yError ? 'bg-red-500 border-red-500' : 'bg-white border-gray-500'}`}
            value={y}
            placeholder="a"
            onChange={handleYChange}
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
