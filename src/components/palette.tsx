import { Node } from "reactflow";
import { shallow } from "zustand/shallow";
import useStore from "@/config/store";
import { AddNodePanel } from "./panels";

const selector = (state: { selectedNode: Node | null }) => ({
  selectedNode: state.selectedNode,
});

export const Palette = () => {
  const { selectedNode } = useStore(selector, shallow);
  const CurrentPanel = getPanel(selectedNode?.type || "");

  return (
    <div className="bg-gray-100 border-gray-200 ">
      <CurrentPanel />
    </div>
  );
};

const getPanel = (type: string) => {
  return AddNodePanel;
};
