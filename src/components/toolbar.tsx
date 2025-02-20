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
        <Button size="sm" onClick={onRestore}>
          Open
        </Button>
        <Button size="sm" onClick={onSave}>
          Save
        </Button>
        <Button size="sm" onClick={onSaveAsSVG}>
          Save as 
        </Button>
        <Button size="sm" onClick={onSaveAsSVG}>
          Upload
        </Button>
        <Button size="sm" onClick={onSaveAsSVG}>
          Configuration
        </Button>
        <Button size="sm" onClick={onSaveAsSVG}>
          Send to Backend
        </Button>
        <Button size="sm" onClick={onSaveAsSVG}>
          Send to Qunicorn
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
