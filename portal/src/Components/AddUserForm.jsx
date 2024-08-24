// AddUserForm.jsx
import React, { useState } from 'react';

const AddUserForm = ({ addUser, onClose }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(name, role); // Call the addUser function passed as a prop
    onClose(); // Close the form
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>Add a New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
