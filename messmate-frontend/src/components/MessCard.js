import React from 'react';
import './MessCard.css';

function MessCard({ mess }) {
  return (
    <div className="mess-card">
      <h3 className="mess-name">{mess.name}</h3>
      <p className="mess-location">📍 {mess.location}</p>
      <p className="mess-price">₹ {mess.price} / month</p>
    </div>
  );
}

export default MessCard;
