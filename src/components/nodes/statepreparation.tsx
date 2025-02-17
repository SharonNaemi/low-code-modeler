import React, { memo, useState, useRef } from "react";
import { Handle, Position, Node } from "reactflow";
import { IPortData } from "./model";

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
      <div className="w-[320px] h-[180px] rounded-none bg-white border border-solid border-gray-700 shadow-md">
        <div className="w-full bg-green-300 text-black text-center font-semibold py-1 truncate">
          State Preparation
        </div>
        <div className="custom-node-port-in space-y-2 px-3">
          <div className="relative flex items-center space-x-2 overflow-visible">
          <div>
            <Handle
              type="target"
              id="input"
              position={Position.Left}
              className="z-10 classical-circle-port-in !bg-blue-300 !border-blue-300"
              style={{ top: "12px" }}
            />
            <span className="text-black text-sm">Input</span>
            </div>
          </div>
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
          <div className="relative flex items-center justify-end space-x-2 overflow-visible" >
            <div className="flex items-center space-x-2">
              <label htmlFor="y" className="text-black text-sm mr-2">Output</label>
              <input
                ref={yRef}
                id="y"
                className={`p-1 text-black opacity-75 text-sm w-10 text-center rounded-none border ${yError ? 'bg-red-500 border-red-500' : 'bg-white border-gray-500'}`}
                value={y}
                placeholder="a"
                onChange={handleYChange}
              />
              <Handle
                type="target"
                id="output"
                position={Position.Right}
                className="!absolute !right-[-19px] !top-[50%] !translate-y-[-50%] z-10 circle-port-out ml-4 !bg-green-300 !border-green-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
