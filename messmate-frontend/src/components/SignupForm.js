import React, { useState } from 'react';
import api from '../services/api';

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
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="username" onChange={handleChange} />
      <input name="password" type="password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default SignupForm;
