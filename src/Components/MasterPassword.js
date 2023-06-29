import React, { useState } from 'react';

const MasterPassword = ({ onSubmit }) => {
  const [masterPassword, setMasterPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(masterPassword);
  };

  return (
    <div>
      <h2>Master Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="masterPassword">Enter Master Password:</label>
          <input
            type="password"
            id="masterPassword"
            value={masterPassword}
            onChange={(e) => setMasterPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MasterPassword;
