import { Edge } from "@xyflow/react";

export const initialEdges: Edge[] = [];

export const initialNodes: Node[] = [];

export enum HistoryAction {
  AddNode = "addNode",
  RemoveNode = "removeNode",
  AddEdge = "addEdge",
  RemoveEdge = "removeEdge",
  MoveNode = "moveNode",
}
