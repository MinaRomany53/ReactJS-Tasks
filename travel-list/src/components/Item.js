export default function Item({ item, onDeleteItem, onCheckItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.checked}
        onChange={() => onCheckItem(item.id)}
      />
      <span className={`${item.checked ? "checked" : ""}`}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
