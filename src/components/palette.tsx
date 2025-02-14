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
    <div className="bg-white h-full border-gray-200 border">
      <CurrentPanel />
    </div>
  );
};

const getPanel = (type: string) => {
  return AddNodePanel;
};
