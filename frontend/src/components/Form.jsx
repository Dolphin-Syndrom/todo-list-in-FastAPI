import { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    setIsSubmitting(true);

    try {
      await onAddTodo({
        title: title.trim(),
        description: description.trim(),
        completed: false,
      });

      setTitle("");
      setDescription("");
    } catch (error) {
      alert("Failed to create todo. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Todo title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          disabled={isSubmitting}
        />
      </div>

      <div style={styles.inputGroup}>
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...styles.input, ...styles.textarea }}
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" style={styles.button} disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "➕ Add Todo"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    backgroundColor: "#f7fafc",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #e2e8f0",
    borderRadius: "6px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  textarea: {
    minHeight: "80px",
    resize: "vertical",
    fontFamily: "inherit",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#151f30ff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default TodoForm;
