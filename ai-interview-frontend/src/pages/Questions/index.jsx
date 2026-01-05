import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import api from "../../services/api";
import "./index.css";

function Questions() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [technical, setTechnical] = useState([]);
  const [hr, setHr] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log("Session ID from params:", id);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get(
          `/sessions/${id}/questions`
        );
        console.log("Questions fetched:", response.data);
        setTechnical(response.data.technical || []);
        setHr(response.data.hr || []);
      } catch (err) {
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  return (
    <div className="container">
      <Header />

      <div className="questions-container">
        <h2>Interview Questions</h2>

        {loading && <p>Loading questions...</p>}
        {error && <p className="error">{error}</p>}

        <h3>Technical Questions</h3>

        {technical.length === 0 && <p>No technical questions found.</p>}

        {technical.map((q, index) => (
          <div key={index} className="question-card">
            <p>
              <strong>Q{index + 1}:</strong> {q.question}
            </p>
            <p>
              <strong>Answer:</strong> {q.answer}
            </p>

          </div>
        ))}

        <h3>HR Questions</h3>

        {hr.length === 0 && <p>No HR questions found.</p>}

        {hr.map((q, index) => (
          <div key={index} className="question-card">
            <p>
              <strong>Q{index + 1}:</strong> {q.question}
            </p>
            <p>
              <strong>Answer:</strong> {q.answer}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Questions;
