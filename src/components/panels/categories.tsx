export type NodeType =
  | "operationNode1"
  | "operationNode2"
  | "stateNode1"
  | "stateNode2"
  | "classicalInt"
  | "classicalFloat"
  | "classicalBoolean"
  | "quantumQint"
  | "quantumQfloat";

export interface Node {
  label: string;
  type: NodeType;
}

export interface Categories {
  [key: string]: Node[] | { [subcategory: string]: Node[] };
}

export const categories: { [key: string]: any } = {
  "Data Types": {
    "Classical Datatypes": [
      { label: "int", type: "classicalInt" },
      { label: "float", type: "classicalFloat" },
      { label: "boolean", type: "classicalBoolean" },
    ],
    "Quantum Datatypes": [
      { label: "qint", type: "quantumQint" },
      { label: "qfloat", type: "quantumQfloat" },
    ],
  },
  Operators: {
    "Assignment Operators": [
      { label: "=", type: "operationNode1" },
      { label: "+=", type: "operationNode2" },
      { label: "-=", type: "operationNode1" },
    ],
    "Comparison Operators": [
      { label: "<", type: "operationNode1" },
      { label: "<=", type: "operationNode2" },
      { label: ">", type: "operationNode1" },
      { label: ">=", type: "operationNode2" },
      { label: "==", type: "operationNode1" },
      { label: "!=", type: "operationNode2" },
    ],
    "Arithmetic Operators": [
      { label: "+", type: "operationNode1" },
      { label: "-", type: "operationNode2" },
      { label: "*", type: "operationNode1" },
      { label: "/", type: "operationNode2" },
      { label: "%", type: "operationNode1" },
      { label: "**", type: "operationNode2" },
    ],
    "Bitwise Operators": [
      { label: "|", type: "operationNode1" },
      { label: "&", type: "operationNode2" },
      { label: "^", type: "operationNode1" },
      { label: "~", type: "operationNode2" },
    ],
    "Logical Operators": [
      { label: "NAND (Toffoli)", type: "operationNode1" },
      { label: "AND", type: "operationNode2" },
      { label: "OR", type: "operationNode1" },
    ],
    "Conditionally Ternary Operator": [
      { label: "Condition ? true : false", type: "operationNode1" },
    ],
    "Relational Operators": [{ label: "Grover?", type: "operationNode2" }],
  },
  "State Preparation": [
    { label: "State Node 1", type: "stateNode1" },
    { label: "State Node 2", type: "stateNode2" },
  ],
  "Flow Structures": {
    Loop: [
      { label: "For Loop", type: "operationNode1" },
      { label: "While Loop", type: "operationNode2" },
    ],
    "If-Then-Else": [
      { label: "If-Then", type: "operationNode1" },
      { label: "If-Then-Else", type: "operationNode2" },
    ],
    Switch: [{ label: "Switch Case", type: "operationNode1" }],
  },
};
