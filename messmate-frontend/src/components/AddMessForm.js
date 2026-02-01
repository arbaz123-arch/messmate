import React, { useState } from 'react';
import api from '../services/api';
import './AddMessForm.css';

function AddMessForm({ onMessAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

      // ✅ FRONTEND VALIDATION (ADDED)
    if (Number(formData.price) < 1000) {
        setError('Price must be at least ₹1000');
        return; // ❌ stop submission
    }

    try {
      const response = await api.post('/messes', {
        name: formData.name,
        location: formData.location,
        price: parseInt(formData.price)
      });
      setMessage('Mess added successfully!');
      setFormData({ name: '', location: '', price: '' });
      if (onMessAdded) onMessAdded(response.data);
    } catch (err) {
      setError('Failed to add mess. Please check your inputs.');
    }
  };

  return (
  <div className="add-mess-container">
    <h2>Add New Mess</h2>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Mess Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Monthly Price (₹):</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>

    {message && <p className="success-msg">{message}</p>}
    {error && <p className="error-msg">{error}</p>}
  </div>
);

}

export default AddMessForm;
