import React, { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import Spinner from './Spinner';
import MessCard from './MessCard';

function MessList({ refresh }) {
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState('');

  // 🔁 Fetch data from backend
  const fetchData = useCallback(() => {
    setLoading(true);
    setError('');

    api.get('/messes', {
      params: {
        location: location
      }
    })
      .then((res) => {
        setMesses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load mess data.');
        setLoading(false);
      });
  }, [location]);

  // 🔥 Re-fetch when location OR refresh changes
  useEffect(() => {
    fetchData();
  }, [fetchData, refresh]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Mess Listings</h2>

      {/* 🔽 LOCATION FILTER */}
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">All Locations</option>
        <option value="Pune">Pune</option>
        <option value="Bhopal">Bhopal</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
        <option value="Patna">Patna</option>
      </select>


      {/* 🧾 MESS LIST */}
      {messes.length === 0 ? (
        <p>No mess found for this location.</p>
      ) : (
        <div className="mess-grid">
          {messes.map((mess) => (
            <MessCard
              key={mess.id || mess._id}
              mess={mess}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MessList;

