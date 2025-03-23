import { Link } from "react-router";

const NotFound = () => (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "white",
    color: "black",
    textAlign: "center",
    fontSize: "12px",
    flexDirection: "column",
  }}>
    <h1>404</h1>
    <p>Page Not Found</p>
    <Link to="/" style={{
      marginTop: "10px",
      padding: "8px 16px",
      backgroundColor: "black",
      color: "white",
      textDecoration: "none",
      borderRadius: "4px"
    }}>
      Go Back Home
    </Link>
  </div>
);

export default NotFound;
