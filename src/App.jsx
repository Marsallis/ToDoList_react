import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleNewItemChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    setItems([...items, { name: newItem, completed: false }]);
    setNewItem("");
  };

  const handleDeleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleDeleteAll = () => {
    setItems([]);
  };

  const handleItemCompletion = (index) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);
  };

  const handleAllItemsCompletion = () => {
    const newItems = [...items];
    newItems.forEach((item) => (item.completed = true));
    setItems(newItems);
  };
  const handleAllItemsIncompletion = () => {
    const newItems = [...items];
    newItems.forEach((item) => (item.completed = false));
    setItems(newItems);
  };

  const handleDeleteAllCompleted = () => {
    const newItems = [...items];
    newItems.forEach((item) => {
      if (item.completed) {
        newItems.splice(newItems.indexOf(item), 1);
      }
    });
    setItems(newItems);
  };

  return (
    <>
      <form className="new-item-form" onSubmit={handleAddItem}>
        <div className="form-row">
          <label htmlFor="item">Add New Items</label>
          <input
            placeholder="Add New Item"
            type="text"
            id="item"
            value={newItem}
            onChange={handleNewItemChange}
          />
        </div>
        <button className="btn" type="submit">
          Add Items
        </button>
        <button className="btn btn-danger" onClick={handleDeleteAll}>
          Delete All
        </button>
      </form>
      <h1>Todo List</h1>
      <button className="btn" onClick={handleAllItemsCompletion}>
        Complete All
      </button>
      <button className="btn" onClick={handleAllItemsIncompletion}>
        Incomplete All
      </button>
      <ul className="list-group">
        {items.length === 0 && <li className="list-group-item">No Items</li>}
        {items.map((item, index) => (
          <li className="list-group-item" key={index}>
            <label>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleItemCompletion(index)}
              />
              <span className={item.completed ? "completed" : ""}>
                {item.name}
              </span>
            </label>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteItem(index)}
            >
              Delete
            </button>
          </li>
        ))}
        <button className="btn btn-danger" onClick={handleDeleteAllCompleted}>
          Delete All Completed
        </button>
      </ul>
    </>
  );
}

export default App;
