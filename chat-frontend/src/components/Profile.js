import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile({ token }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/users/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setProfile(response.data);
      } catch (error) {
        console.error(
          'Failed to fetch profile:',
          error.response?.data || error.message,
        );
      }
    };

    fetchProfile();
  }, [token]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {profile.username}</p>
      {/* Add more profile information as needed */}
    </div>
  );
}

export default Profile;
