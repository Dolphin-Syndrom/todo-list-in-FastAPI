function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}> My Todo List</h1>
      <p style={styles.subtitle}> List your Todos!</p>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#151f30ff",
    color: "whitesmoke",
    padding: "20px",
    textAlign: "center",
    borderRadius: "8px 8px 0 0 ",
    marginBottom: "20px",
  },
  title: {
    margin: 0,
    fontSize: "32px",
  },
  subtitle: {
    margin: "5px 0 0 0",
    fontSize: "14px",
    opacity: 0.8,
  },
};

export default Header;
