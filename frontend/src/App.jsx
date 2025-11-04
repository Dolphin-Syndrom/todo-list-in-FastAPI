import { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoForm from "./components/Form";
import TodoList from "./components/List";
import { todoAPI } from "./services/api";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoAPI.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError("Failed to load todos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await todoAPI.createTodo(todoData);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      console.error("Error creating todo:", err);
      throw err;
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      await todoAPI.updateTodo(id, todoData);
      setTodos(
        todos.map((todo) => (todo._id === id ? { ...todo, ...todoData } : todo))
      );
    } catch (err) {
      console.error("Error updating todo:", err);
      throw err;
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      throw err;
    }
  };

  return (
    <div className="app-container">
      <Header />

      <div className="content">
        <TodoForm onAddTodo={handleAddTodo} />

        {loading ? (
          <p style={{ textAlign: "center", color: "#888", padding: "40px" }}>
            Loading todos...
          </p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "#e53e3e", padding: "40px" }}>
            {error}
          </p>
        ) : (
          <TodoList
            todos={todos}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  todoList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  todoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#f7fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  badge: {
    fontSize: "20px",
  },
};

export default App;
