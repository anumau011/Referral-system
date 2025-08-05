import React, { useEffect, useState } from 'react';
import { API_URLS } from './config/api';

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(API_URLS.LEADERBOARD)
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Referral Code</th>
            <th>Total Donations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.referralCode}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.referralCode}</td>
              <td>${item.totalDonations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
