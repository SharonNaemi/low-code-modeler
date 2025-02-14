import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import { IPortData } from "../model";
import { Position } from "reactflow";

const CustomNode = (node: any) => {
  const data = node.data;
  return (
    <div className="custom-node">
      <div className="custom-node-header">{data.name}</div>
      <div className="custom-node-subheader custom-node-subheader__inputs">
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
                position={Position.Left}
                className="circle-port circle-port-left"
                isValidConnection={(connection) =>
                  {return true;}
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CustomNodeComponent = memo(CustomNode);
