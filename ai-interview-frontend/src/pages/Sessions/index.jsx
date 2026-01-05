import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import api from "../../services/api";
import "./index.css";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/sessions");
        setSessions(response.data);
      } catch (err) {
        setError("Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="session-main-container">
      <Header />

      <h2>Previous Sessions</h2>

      {/* <div className="sessions-container"> */}
        

        {loading && <p>Loading sessions...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && sessions.length === 0 && (
          <p>No sessions found.</p>
        )}

        <div className="sessions-grid">
          {sessions.map((session) => (
            <div key={session._id} className="session-card" 
                onClick={() =>
                  session.status === "COMPLETED" &&
                  navigate(`/sessions/${session._id}`)
                }
            >
              <p>
                <strong>Date:</strong>{" "}
                {new Date(session.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    session.status === "COMPLETED"
                      ? "status-completed"
                      : "status-pending"
                  }
                >
                  {session.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      {/* </div> */}
    </div>
  );
}

export default Sessions;
