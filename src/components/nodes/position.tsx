import React, { memo, useState, useRef } from "react";
import { Handle, Position, Node } from "reactflow";
import { IPortData } from "./model";

export const PositionNode = memo((node: Node) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [error, setError] = useState(false); // To track validation errors
  const { data, selected, id } = node;

  // References to prevent continuous updates
  const xRef = useRef(null);
  const yRef = useRef(null);
  const zRef = useRef(null);

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
    <div className="w-[320px] h-[150px] rounded-full bg-gray-800 overflow-hidden border border-solid border-gray-700 shadow-md relative">
      <Handle type="source" position={Position.Right} id="b" style={{ top: 30 }} />

      <div className="p-1 bg-blue-300 text-black text-center font-semibold">{data.dataType}</div>

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

      <div className="absolute bottom1/2 right-2 transform -translate-y-1/2 flex items-center space-x-2">
        <label htmlFor="y" className="text-white text-sm mr-2">Output</label>
        <input
          ref={yRef}
          id="y"
          type="number"
          className="p-1 text-black opacity-75 text-sm rounded-none w-20 text-center bg-white border-gray-500"
          value={y}
          onChange={(e) => setY(Number(e.target.value))}
        />
      </div>

      <div className="custom-node-port-in">{"Inputs"}</div>
              {data.inputs.map((input: IPortData) => (
                <div
                  className="custom-node-port custom-node-port-in"
                  key={"i-" + input.id}
                >
                  {input.label}
                  <div className={``}>
                    <Handle
                      type="target"
                      id={input.id}
                      position={Position.Right}
                      className="circle-port circle-port-left"
                      isValidConnection={(connection) =>
                        {return true;}
                      }
                    />
                  </div>
                </div>
                
              ))}
    </div>
  );
});
