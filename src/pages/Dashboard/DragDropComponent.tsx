import React, { useState } from "react";

function DragDropComponent() {
  const [items, setItems] = useState<string[]>([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("dragIndex", index.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    const dragIndex = parseInt(e.dataTransfer.getData("dragIndex"));

    if (dragIndex !== dropIndex) {
      const updatedItems = [...items];
      const draggedItem = updatedItems.splice(dragIndex, 1)[0];
      updatedItems.splice(dropIndex, 0, draggedItem);
      setItems(updatedItems);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // This allows the drop event to happen
  };

  return (
    <div className="w-64 p-4 bg-gray-100 rounded">
      <h3 className="font-bold mb-4">Drag and Drop List</h3>
      {items.map((item, index) => (
        <div
          key={index}
          className="p-2 mb-2 bg-white rounded shadow cursor-pointer"
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={handleDragOver}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default DragDropComponent;
