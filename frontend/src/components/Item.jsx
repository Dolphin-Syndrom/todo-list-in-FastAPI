import { useState } from "react";

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle completed status
  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      await onUpdate(todo._id, {
        ...todo,
        completed: !todo.completed,
      });
    } catch (error) {
      alert("Failed to update todo");
    } finally {
      setIsLoading(false);
    }
  };

  // Save edited todo
  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      await onUpdate(todo._id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        completed: todo.completed,
      });
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update todo");
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  // Delete todo with confirmation
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setIsLoading(true);
      try {
        await onDelete(todo._id);
      } catch (error) {
        alert("Failed to delete todo");
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      style={{
        ...styles.todoItem,
        opacity: isLoading ? 0.6 : 1,
        backgroundColor: todo.completed ? "#f0fff4" : "#ffffff",
      }}
    >
      {isEditing ? (
        // Edit Mode
        <div style={styles.editMode}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={styles.editInput}
            placeholder="Todo title"
            disabled={isLoading}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            style={{ ...styles.editInput, ...styles.editTextarea }}
            placeholder="Description"
            disabled={isLoading}
          />
          <div style={styles.editButtons}>
            <button
              onClick={handleSaveEdit}
              style={{ ...styles.button, ...styles.saveButton }}
              disabled={isLoading}
            >
              ✓ Save
            </button>
            <button
              onClick={handleCancelEdit}
              style={{ ...styles.button, ...styles.cancelButton }}
              disabled={isLoading}
            >
              ✕ Cancel
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <>
          <div style={styles.todoContent}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
              style={styles.checkbox}
              disabled={isLoading}
            />
            <div style={styles.todoText}>
              <h3
                style={{
                  ...styles.todoTitle,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#68d391" : "#2d3748",
                }}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  style={{
                    ...styles.todoDescription,
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.description}
                </p>
              )}
            </div>
          </div>
          <div style={styles.todoActions}>
            <button
              onClick={() => setIsEditing(true)}
              style={{ ...styles.button, ...styles.editButton }}
              disabled={isLoading}
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              style={{ ...styles.button, ...styles.deleteButton }}
              disabled={isLoading}
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  todoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "2px solid #e2e8f0",
    marginBottom: "12px",
    transition: "all 0.3s ease",
  },
  todoContent: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    flex: 1,
  },
  checkbox: {
    width: "20px",
    height: "20px",
    marginTop: "2px",
    cursor: "pointer",
  },
  todoText: {
    flex: 1,
  },
  todoTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
  },
  todoDescription: {
    margin: "4px 0 0 0",
    fontSize: "14px",
    color: "#718096",
  },
  todoActions: {
    display: "flex",
    gap: "8px",
  },
  button: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.2s",
  },
  editButton: {
    backgroundColor: "#edf2f7",
    "&:hover": {
      backgroundColor: "#e2e8f0",
    },
  },
  deleteButton: {
    backgroundColor: "#fed7d7",
    "&:hover": {
      backgroundColor: "#fc8181",
    },
  },
  editMode: {
    width: "100%",
  },
  editInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    border: "2px solid #cbd5e0",
    borderRadius: "6px",
    outline: "none",
  },
  editTextarea: {
    minHeight: "60px",
    resize: "vertical",
    fontFamily: "inherit",
  },
  editButtons: {
    display: "flex",
    gap: "8px",
  },
  saveButton: {
    backgroundColor: "#48bb78",
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#cbd5e0",
    color: "#2d3748",
  },
};

export default TodoItem;
