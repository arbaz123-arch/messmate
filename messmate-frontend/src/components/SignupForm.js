import React, { useState } from 'react';
import api from '../services/api';
import '../styles/Auth.css';

const SignupForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Registration successful. Please log in.');
    } catch (err) {
      if (err.response?.status === 409) {
        alert('User already exists.');
      } else {
        alert('Registration failed.');
      }
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  </div>
);

};

export default SignupForm;
