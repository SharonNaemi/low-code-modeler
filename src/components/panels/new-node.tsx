import React, { useState } from "react";
import { categories, Node } from "./categories";
import { MessagesSquare } from "lucide-react";

export const AddNodePanel = () => {
  // State for tracking the active category
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Handle drag-and-drop functionality
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, node: Node) => {
    event.dataTransfer.setData("application/reactflow", node.type);
    event.dataTransfer.effectAllowed = "move";
    console.log("drag start")
  };

  // Toggle category open/collapse
  const toggleCategory = (category: string) => {
    setActiveCategory((prevCategory) =>
      prevCategory === category ? null : category,
    );
  };

  return (
    <div className="h-screen w-full bg-white overflow-hidden">
      {/* Full-width sidebar */}
      <aside className="flex flex-col w-full h-full overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <nav className="space-y-4">
          {/* Render categories */}
          {Object.keys(categories).map((category) => (
            <div key={category}>
              {/* Category Button */}
              <button
                className={`w-full text-left py-2 px-4 font-semibold text-gray-700 border-b ${
                  activeCategory === category
                    ? "bg-gray-100 text-primary"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>

              {/* Render Subcategories and Nodes if category is active */}
              {activeCategory === category && (
                <div className="pl-4 mt-2 space-y-4">
                  {Object.keys(categories[category]).map((subcategory) => (
                    <div key={subcategory}>
                      <div className="font-semibold text-gray-600">
                        {subcategory}
                      </div>
                      <div className="space-y-2 mt-2">
                        {/* Render nodes */}
                        {categories[category][subcategory].map((node: Node) => (
                          <div
                            key={node.type}
                            className="border border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400 hover:bg-gray-100 py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"
                            onDragStart={(event) => onDragStart(event, node)}
                            draggable
                          >
                            <MessagesSquare
                              color="hsl(222.2,47.4%,11.2%)"
                              size="32"
                            />
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
