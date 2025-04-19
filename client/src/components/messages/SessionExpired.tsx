import { useNavigate } from "react-router";
const SessionExpired = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "white",
          color: "black",
          textAlign: "center",
          fontSize: "12px",
          flexDirection: "column",
        }}
      >
        <h1>Session Expired</h1>
        <p>Your session has expired. Please log in again.</p>
        <button
          onClick={() => navigate("/auth")}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "black",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Go Back Home
        </button>
      </div>
    </>
  );
};

export default SessionExpired;
