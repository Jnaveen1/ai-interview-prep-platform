import Header from "../../components/Header";
import "./index.css";

function Home() {
  return (
    <div>
      <Header />

      <div className="home-container">
        <div className="home-overlay">
          <h1>Welcome to AI Interview Copilot</h1>
          <p>Prepare smarter. Perform better.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
