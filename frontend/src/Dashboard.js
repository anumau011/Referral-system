import React, { useEffect, useState } from 'react';
import { API_URLS } from './config/api';

export default function Dashboard({ userName, onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(API_URLS.USER)
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={onLogout}>Logout</button>
      {user ? (
        <div>
          <p><b>Intern Name:</b> {user.name}</p>
          <p><b>Referral Code:</b> {user.referralCode}</p>
          <p><b>Total Donations Raised:</b> ${user.totalDonations}</p>
          <h3>Rewards / Unlockables</h3>
          <ul>
            <li>🎁 Bronze Badge (500+)</li>
            <li>🏅 Silver Badge (1000+)</li>
            <li>🥇 Gold Badge (2000+)</li>
          </ul>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
}
