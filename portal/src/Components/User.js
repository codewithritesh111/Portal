import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Team = () => {
  const { id } = useParams(); // Extract the team ID from the URL
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch users associated with the team ID
    fetch('http://localhost:5000/update/getUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'team-id': id, // Pass the team ID as a header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to add the new user
    fetch('http://localhost:5000/update/postUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'team-id': id, // Pass the team ID as a header
      },
      body: JSON.stringify({ name, role }), // Send name and role in the request body
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage('User added successfully!');
        setName(''); // Clear the name input field
        setRole(''); // Clear the role input field
        setTeams((prevTeams) => [...prevTeams, data]); // Update the teams state with the new user
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        setMessage('Failed to add user.');
      });
  };

  return (
    <div className='container'>

      <h3>Add a New User</h3>
      {message && <p>{message}</p>}
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
      <br/>
      <br/>

      <h2>Members</h2>
      <div className="container">
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <h5 className="card-title">Role: {team.role}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
