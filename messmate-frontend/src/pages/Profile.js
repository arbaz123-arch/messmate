import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // 🔁 Reusable function to fetch profile
  const fetchProfile = () => {
    setLoading(true);
    setError('');

    api.get('/profile')
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch profile. You may be logged out.');
        setLoading(false);
      });
  };

  // 🔁 Fetch on page load
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Profile</h2>

      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>

      {/* 🆕 Extra fields */}
      <p><strong>Role:</strong> {profile.role}</p>
      <p>
        <strong>Joined At:</strong>{' '}
        {new Date(profile.joinedAt).toLocaleDateString()}
      </p>

      {/* 🔁 Refresh button */}
      <button onClick={fetchProfile}>Refresh Profile</button>
    </div>
  );
};

export default Profile;
