import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import List from "./List";
import Stats from "./Stats";

function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (itemId) => {
    setItems((items) => items.filter((item) => item.id !== itemId));
  };

  const handleCheckedItem = (itemId) => {
    setItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleClearAllList = () => {
    if (items.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  };

  return (
    <div className="app">
      <Header />
      <Form onAddItem={handleAddItem} />
      <List
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheckItem={handleCheckedItem}
        onClearAllList={handleClearAllList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
