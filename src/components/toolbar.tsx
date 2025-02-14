import React, { useState } from "react";
import { Button } from "./ui";

interface ToolbarProps {
  onSave: () => void;
  onRestore: () => void;
  onSaveAsSVG: () => void;
  onOpenConfig: () => void;
  onLoadJson: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onSave,
  onRestore,
  onSaveAsSVG,
  onOpenConfig,
  onLoadJson
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-300">
      <div className="space-x-4">
	  <Button size="sm" onClick={onLoadJson}>
          New Diagram
        </Button>
        <Button size="sm" onClick={onSave}>
          Save Changes
        </Button>
        <Button size="sm" onClick={onRestore}>
          Restore Changes
        </Button>
        <Button size="sm" onClick={onSaveAsSVG}>
          Save as SVG
        </Button>
        <Button size="sm" onClick={onSaveAsSVG}>
          Config
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
