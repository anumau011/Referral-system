import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(name || 'John Doe'); // fallback to dummy name
  };

  return (
    <div className="login-container">
      <h2>Login / Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
