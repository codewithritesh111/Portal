import React, { useState } from 'react';


const AddTeamForm = ({ onClose, addTeam }) => {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTeam(teamName);
    setTeamName('');
    onClose(); // Close the modal after adding a team
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="teamName">Team Name:</label>
            <input
              type="text"
              className="form-control"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Add Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeamForm;
