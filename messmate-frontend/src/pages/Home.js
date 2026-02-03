import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => (
  <div className="home-container">
    <div className="home-card">
      <h1>Welcome to MessMate</h1>
      <p>Find and manage mess listings easily.</p>

      <div className="home-actions">
        <Link to="/login">Login</Link>
        <Link to="/signup" className="secondary">
          Signup
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
