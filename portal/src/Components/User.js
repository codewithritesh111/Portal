import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card'; // Import Card component

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
    <div className=''>
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

      <br />
      <br />

      <h1 className='heading'>Members</h1>
      <hr />
      <div className="allcards">
        {teams.map((team) => (
          <Card key={team._id} smes={{ 
            name: team.name, 
            email: team.email || 'abc@email.com', 
            username: team.username || '@abc12345', 
            account: team.account || 'abc.teams.com', 
            phoneNumber: team.phoneNumber || '8888888888', 
            location: team.location || 'Pune', 
            profession: team.profession || 'Web Developer', 
            img: team.img || 'default_image_url_here' // Replace with a default image URL if necessary 
          }} />
        ))}
      </div>
    </div>
  );
};

export default Team;
