import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">MessMate</Link>
      </div>

      <div className="navbar-right">
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}
        {user && <Link to="/profile">Profile</Link>}
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
