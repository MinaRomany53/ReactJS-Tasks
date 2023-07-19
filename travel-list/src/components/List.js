import { useState } from "react";
import Item from "./Item";

export default function List({
  items,
  onDeleteItem,
  onCheckItem,
  onClearAllList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") {
    sortedItems = items;
  }
  if (sortBy === "description") {
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  }
  if (sortBy === "checked") {
    sortedItems = [...items].sort((a, b) => a.checked - b.checked);
  }

  return (
    <main className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onCheckItem={onCheckItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="checked">Sort by packed status </option>
        </select>
        <button onClick={onClearAllList}>Clear List</button>
      </div>
    </main>
  );
}
