import ClassicalEdge from "@/components/edges/classicalEdgeType";
import CustomEdge from "@/components/edges/custom";
import QuantumEdge from "@/components/edges/customEdgeType";
import Wire from "@/components/edges/customEdgeType";
import { TextNode, DataTypeNode, PositionNode } from "@/components/nodes";
import { AncillaNode } from "@/components/nodes/ancilla";
import { DynamicNode } from "@/components/nodes/dynamically";
import { MeasurementNode } from "@/components/nodes/measurement";
import { OperationNode } from "@/components/nodes/operation";
import { StatePreparationNode } from "@/components/nodes/statepreparation";
import { UncomputeNode } from "@/components/nodes/uncompute";
import { MarkerType, Position } from "reactflow";
import { Edge } from "reactflow";

export const stageTest = {
  id: "stage-id-00023",
  order: 1,
  job: {
    id: "job-id-00023",
    name: "Project generation",
    owner: {
      id: "user-id-00013",
      fullName: "System administrator",
      email: "admin@example.com",
      groups: [
        {
          id: "group-id-0004",
          name: "Everyone"
        },
        {
          id: "group-id-0003",
          name: "Administrators",
          description: "System administrators"
        }
      ]
    },
    type: "script",
    isSingleThread: true,
    groups: [
      {
        id: "group-id-00043",
        name: "Everyone"
      }
    ],
    description: "HTZ coverage calculation",
    OS: ["windows"],
    calls: [
      {
        id: "call-id-00023",
        system: "windows",
        command:
          "prm-gen.bat {{prm-file}} {{ewf-file}} {{geo-file}} {{sol-file}} {{blg-file}}"
      }
    ],
    inputs: [
      {
        id: "input-id-00013",
        name: "Network number",
        ident: "ewf-file",
        isArray: false,
        isRequired: true,
        type: "number",
        descriptor: {
          extensions: ["EWFx"]
        }
      },
      {
        id: "input-id-00023",
        name: "Parameters file",
        ident: "prm-file",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          extensions: ["PRM"]
        }
      },
      {
        id: "input-id-00033",
        name: "DTM layer file",
        ident: "geo-file",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          extensions: ["GEO"]
        }
      },
      {
        id: "input-id-00043",
        name: "Clutter layer file",
        ident: "sol-file",
        isArray: false,
        isRequired: false,
        type: "file",
        descriptor: {
          extensions: ["SOL"]
        }
      },
      {
        id: "input-id-00053",
        name: "Building layer file",
        ident: "blg-file",
        isArray: false,
        isRequired: false,
        type: "file",
        descriptor: {
          extensions: ["BLG"]
        }
      }
    ],
    outputs: [
      {
        id: "output-id-00023",
        name: "Generated PROx file",
        ident: "pro-file-out",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          type: "search",
          relativeDir: "",
          namePattern: "*.PRM"
        }
      },
      {
        id: "output-id-00034",
        name: "Forwarded PRM file",
        ident: "prm-file",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          type: "search",
          relativeDir: ".",
          namePattern: "*.PRM"
        }
      },
      {
        id: "output-id-00043",
        name: "Forwarded GEO file",
        ident: "geo-file-out",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          type: "search",
          relativeDir: ".",
          namePattern: "*.GEO"
        }
      },
      {
        id: "output-id-00054",
        name: "Forwarded SOL file",
        ident: "sol-file-out",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          type: "search",
          relativeDir: ".",
          namePattern: "*.SOL"
        }
      },
      {
        id: "output-id-00063",
        name: "Forwarded SOL file",
        ident: "blg-file-out",
        isArray: false,
        isRequired: true,
        type: "file",
        descriptor: {
          type: "search",
          relativeDir: ".",
          namePattern: "*.BLG"
        }
      },
      {
        id: "output-id-000753",
        name: "Forwarded number",
        ident: "ewf-file-out",
        isArray: false,
        isRequired: true,
        type: "number",
        descriptor: {
          type: "search",
          relativeDir: "",
          namePattern: "*.EWFx"
        }
      }
    ],
    inputData: {},
    outputData: {}
  }
};
export const nodesConfig = {
  initialNodes: [ ] as unknown as Node[],
  initialEdges: [] as Edge[],
  nodeTypes: {
    textNode: TextNode,
    dataTypeNode: DataTypeNode,
    positionNode: PositionNode,
    dynamicNode: DynamicNode,
    measurementNode: MeasurementNode,
    statePreparationNode: StatePreparationNode,
    operationNode: OperationNode,
    uncomputeNode: UncomputeNode,
    arithmeticOperatorNode: OperationNode,
    ancillaNode: AncillaNode
  } as any,
  edgesTypes: {
    quantumEdge: QuantumEdge,
    classicalEdge: ClassicalEdge
  }
};

export const initialDiagram = {
  initialNodes: [
    
  ] as Node[],
  initialEdges: [] as Edge[],
  nodeTypes: {
    node: Node,
  } as any,
};
