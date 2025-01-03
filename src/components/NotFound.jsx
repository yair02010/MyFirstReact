function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        color: "#333",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "6rem", color: "#ff6b6b", marginBottom: "20px" }}>404</h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Page Not Found</h2>
      <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "30px" }}>
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/home"
        style={{
          textDecoration: "none",
          padding: "12px 24px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "5px",
          fontWeight: "bold",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Go Back Home
      </a>
    </div>
  );
}

export default NotFound;
