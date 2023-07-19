export default function Stats({ items }) {
  const checkedItems = items.filter((item) => item.checked);
  const checkedPercentage = Math.round(
    (checkedItems.length / items.length) * 100
  );

  return (
    <footer className="stats">
      <h3>
        {items.length === 0
          ? "No items added yet 😔"
          : `You have ${items.length} ${
              items.length === 1 ? "item" : "items"
            } on your
          list, and you already packed ${checkedPercentage}% of them! 🎉`}
      </h3>
    </footer>
  );
}
