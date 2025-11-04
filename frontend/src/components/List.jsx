import { useState } from "react";
import TodoItem from "./Item";

function TodoList({ todos, onUpdate, onDelete }) {
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

  // Filter todos based on selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // 'all'
  });

  // Count statistics
  const totalTodos = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalTodos - completedCount;

  return (
    <div>
      {/* Statistics Bar */}
      <div style={styles.statsBar}>
        <div style={styles.stat}>
          <span style={styles.statNumber}>{totalTodos}</span>
          <span style={styles.statLabel}>Total</span>
        </div>
        <div style={styles.stat}>
          <span style={{ ...styles.statNumber, color: "#f6ad55" }}>
            {activeCount}
          </span>
          <span style={styles.statLabel}>Active</span>
        </div>
        <div style={styles.stat}>
          <span style={{ ...styles.statNumber, color: "#48bb78" }}>
            {completedCount}
          </span>
          <span style={styles.statLabel}>Completed</span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={styles.filterBar}>
        <button
          onClick={() => setFilter("all")}
          style={{
            ...styles.filterButton,
            ...(filter === "all" ? styles.filterButtonActive : {}),
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          style={{
            ...styles.filterButton,
            ...(filter === "active" ? styles.filterButtonActive : {}),
          }}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            ...styles.filterButton,
            ...(filter === "completed" ? styles.filterButtonActive : {}),
          }}
        >
          Completed
        </button>
      </div>

      {/* Todos List */}
      <div style={styles.todoListContainer}>
        {filteredTodos.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>
              {filter === "all" && "📝 No todos yet. Add one above!"}
              {filter === "active" && "🎉 No active todos. Great job!"}
              {filter === "completed" && "⏳ No completed todos yet."}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  statsBar: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#edf2f7",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statNumber: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#2d3748",
  },
  statLabel: {
    fontSize: "12px",
    color: "#718096",
    marginTop: "4px",
  },
  filterBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  filterButton: {
    flex: 1,
    padding: "10px",
    border: "2px solid #e2e8f0",
    borderRadius: "6px",
    backgroundColor: "gray",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  filterButtonActive: {
    backgroundColor: "#151f30ff",
    color: "white",
    borderColor: "#151f30ff",
  },
  todoListContainer: {
    minHeight: "200px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },
  emptyText: {
    fontSize: "18px",
    color: "#a0aec0",
  },
};

export default TodoList;
