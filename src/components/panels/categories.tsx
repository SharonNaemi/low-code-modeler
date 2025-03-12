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
  dataType: string;
}

export interface Categories {
  [key: string]: Node[] | { [subcategory: string]: Node[] };
}

export const categories: { [key: string]: any } = {
  "Boundary Nodes": {
    "Classical To Quantum": [
      { label: "Encode Value", type: "statePreparationNode" },
      { label: "Prepare State", type: "statePreparationNode" },
    ],
    "Quantum To Classical": [
      { label: "Measurement", type: "measurementNode" },
    ]
  },
  "Circuit Blocks & Routines": {
    "Circuit Blocks": [
      { label: "CNOT", type: "circuitBlockNode" },
      { label: "Measurement", type: "circuitBlockNode" },
      { label: "X", type: "circuitBlockNode" },
      { label: "Y", type: "circuitBlockNode" },
      { label: "Z", type: "circuitBlockNode" },
    ],
    "Circuit Routines": [
      { label: "Amplitude Amplification", type: "circuitRoutineNode" },
      { label: "Hadamard Test", type: "circuitRoutineNode" },
      { label: "QFT", type: "circuitRoutineNode" },
      { label: "QPE", type: "circuitRoutineNode" },
      { label: "SWAP Test", type: "circuitRoutineNode" }
    ]
  },
  "Data Types": {
    "Classical Datatypes": [
      { label: "Array", dataType: "Array", type: "positionNode" },
      { label: "bit", dataType: "bit", type: "positionNode" },
      { label: "boolean", dataType: "boolean", type: "positionNode" },
      { label: "int", dataType: "int", type: "positionNode" },
      { label: "float", dataType: "float", type: "positionNode" },
    ],
    "Quantum Type": [
      { label: "Ancilla", dataType: "ancillaNode", type: "ancillaNode" },
    ]
  },
  "Flow Structures": {
    "If-Then-Else": [
      { label: "If-Then-Else", type: "ifElseNode" },
    ],
    "Loop": [
      { label: "Repeat", type: "repeatNode" }
    ],
  },
  Operators: {
    "Arithmetic Operators": [
      { label: "Arithmetic Operator", type: "arithmeticOperatorNode" }
    ],
    "Bitwise Operators": [
      { label: "Bitwise Operator", type: "operationNode" }
    ],
    "Custom Block": [{ label: "custom", type: "operationNode" }],
    "Comparison Operators": [
      { label: "Comparison Operator", type: "operationNode" }
    ],
    "Min & Max": [{ label: "minMax", type: "operationNode" }],
    "Search": [{ label: "search", type: "operationNode" }],
  }
};
