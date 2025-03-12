import React, { useState } from "react";
import { categories, Node } from "./categories";
import { PositionNode } from "../nodes";

export const AddNodePanel = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, node: any) => {
    event.dataTransfer.setData("application/reactflow", node.type);
    event.dataTransfer.setData("application/reactflow/dataType", node.dataType);
    event.dataTransfer.setData("application/reactflow/label", node.label);
    event.dataTransfer.effectAllowed = "move";
    console.log("drag start", node);
  };

  const toggleCategory = (category: string) => {
    setActiveCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  // Flatten categories for easier searching
  const allNodes: Node[] = Object.values(categories).flatMap((subcategories) =>
    Object.values(subcategories).flat()
  );

  // Filter nodes based on search query
  const filteredNodes = searchQuery
    ? allNodes.filter((node) =>
        node.label.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="h-screen w-full bg-gray-100 overflow-hidden">
      <aside className="flex flex-col w-full h-full overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        
        <input
          type="text"
          placeholder="Search nodes..."
          className="mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {searchQuery && (
          <div className="mb-4">
            {filteredNodes.length > 0 ? (
              <div className="space-y-2">
                {filteredNodes.map((node) => (
                  <div
                    key={node.label}
                    className="border border-gray-300 bg-gray-50 text-black-700 hover:border-gray-400 hover:bg-gray-100 py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"
                    onDragStart={(event) => onDragStart(event, node)}
                    draggable
                  >
                    <div className="node-icon"></div>
                    <span className="font-semibold">{node.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No matching nodes found.</p>
            )}
          </div>
        )}

        <nav className="space-y-4">
          {Object.keys(categories).map((category) => (
            <div key={category}>
              <button
                className={`w-full text-left py-2 px-4 font-semibold text-black-700 border-b ${
                  activeCategory === category
                    ? "bg-gray-100 text-primary"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>

              {activeCategory === category && (
                <div className="pl-4 mt-2 space-y-4">
                  {Object.keys(categories[category]).map((subcategory) => (
                    <div key={subcategory}>
                      <div className="font-semibold text-black-600">
                        {subcategory}
                      </div>
                      <div className="space-y-2 mt-2">
                        {categories[category][subcategory].map((node: Node) => (
                          <div
                            key={node.label}
                            className="group border border-gray-300 bg-gray-50 text-black-700 hover:border-gray-400 hover:bg-gray-100 py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"
                            onDragStart={(event) => onDragStart(event, node)}
                            draggable
                          >
                            <svg
      className="w-6 h-6 text-gray-500 group-hover:text-blue-500 transition-colors"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
    </svg>
                            <span className="font-semibold">{node.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
};
