import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";
import React from "react";

export default function ClassicalEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) {
  const [d] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        style={{
          stroke: "#F5A843",
          
        }}
        markerEnd={markerEnd}
        path={d}
      />
    </>
  );
}