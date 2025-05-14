import { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "../components/TodoItem";

function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get("https://backend-428s.onrender.com//api/todos");
      setTodos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Create a new todo
  const createTodo = async () => {
    if (!text.trim()) return;
    try {
      await axios.post("https://backend-428s.onrender.com//api/todos", { text });
      setText("");
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Todo List</h1>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={createTodo}>Add</button>
      </div>

      <div>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
        ))}
      </div>
    </div>
  );
}

export default Home;
