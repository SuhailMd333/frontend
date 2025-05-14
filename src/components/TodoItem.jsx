import { useState } from "react";
import axios from "axios";

function TodoItem({ todo, fetchTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  // Update todo
  const updateTodo = async () => {
    if (!text.trim()) return;
    try {
      await axios.put(`https://backend-428s.onrender.com/api/todos/${todo._id}`, { text });
      setIsEditing(false);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete todo
  const deleteTodo = async () => {
    try {
      await axios.delete(`https://backend-428s.onrender.com/api/todos/${todo._id}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      {isEditing ? (
        <>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ flex: 1, padding: "5px" }}
          />
          <button onClick={updateTodo} style={{ marginLeft: "5px" }}>
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            style={{ marginLeft: "5px" }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span style={{ flex: 1 }}>{todo.text}</span>
          <button
            onClick={() => setIsEditing(true)}
            style={{ marginLeft: "5px" }}
          >
            Edit
          </button>
          <button onClick={deleteTodo} style={{ marginLeft: "5px" }}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default TodoItem;
