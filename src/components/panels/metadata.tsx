import useStore from "@/config/store";
import { ArrowLeft } from "lucide-react";
import { Node } from "reactflow";
import { shallow } from "zustand/shallow";

const selector = (state: {
  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
}) => ({
  selectedNode: state.selectedNode,
  setSelectedNode: state.setSelectedNode,
});

export const MetadataPanel = ({
  metadata,
  onUpdateMetadata,
}: {
  metadata: any;
  onUpdateMetadata: (updatedMetadata: any) => void;
}) => {
  const { setSelectedNode } = useStore(selector, shallow);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { id, value } = event.target;
    console.log(id);
    console.log(value);

    const updatedMetadata = {
      ...metadata,
      [id]: value, // Use the `id` to update the correct metadata field
    };

    onUpdateMetadata(updatedMetadata);
  }

  return (
    <>
      <div className="p-2 font-semibold flex">
        <button
          onClick={() => {
            setSelectedNode(null);
          }}
        ></button>
        <h2 className="flex-grow text-center">Model Information</h2>
      </div>
      <hr />

      <div className="p-2 mt-3 space-y-4">
        {metadata ? (
          <>
            {[
              "version",
              "name",
              "id",
              "author",
              "description",
              "timestamp",
            ].map((field) => (
              <div key={field}>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor={field}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === "description" ? (
                  <textarea
                    id={field}
                    rows={4}
                    value={metadata[field] || ""}
                    onChange={handleChange}
                    className="border block w-full border-gray-300 rounded-md sm:text-sm p-2"
                  />
                ) : (
                  <input
                    type="text"
                    id={field}
                    value={metadata[field] || ""}
                    onChange={handleChange}
                    className="border block w-full border-gray-300 rounded-md sm:text-sm p-2"
                  />
                )}
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-500">No metadata available.</p>
        )}
      </div>
    </>
  );
};
