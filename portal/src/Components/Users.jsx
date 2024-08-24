// Team.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import AddUserForm from './AddUserForm'; // Import the AddUserForm component
import './style.css'; // Assuming you have some styles for the modal and other elements

const Team = () => {
  const { id } = useParams(); // Extract the team ID from the URL
  const [teams, setTeams] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // State to manage form visibility

  useEffect(() => {
    // Fetch users associated with the team ID
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/update/getUser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'team-id': id, // Pass the team ID as a header
          },
        });
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [id]);

  const addUser = async (name, role) => {
    try {
      const response = await fetch('http://localhost:5000/update/postUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'team-id': id, // Pass the team ID as a header
        },
        body: JSON.stringify({ name, role }), // Send name and role in the request body
      });

      const data = await response.json();

      if (response.ok) {
        setTeams([...teams, data]); // Update the teams state with the new user
      } else {
        console.error('Error adding user:', data.error);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <div className="cardheader">
        <div className="add">
          {/* Button to open the form modal */}
          <button
            onClick={() => setIsFormVisible(true)}
            className="btn btn-secondary mb-4"
          >
            Add New User
          </button>

          {/* Render the form as a popup if visible */}
          {isFormVisible && (
            <AddUserForm
              addUser={addUser}
              onClose={() => setIsFormVisible(false)}
            />
          )}
        </div>

        <div>
          <h1 className='heading'>Members</h1>
        </div>
      </div>

      <hr />
      <div className="allcards">
        {teams.map((team) => (
          <Card
            key={team._id}
            smes={{
              name: team.name,
              email: team.email || 'abc@email.com',
              username: team.username || '@abc12345',
              account: team.account || 'abc.teams.com',
              phoneNumber: team.phoneNumber || '8888888888',
              location: team.location || 'Pune',
              profession: team.profession || 'Web Developer',
              img: team.img || 'default_image_url_here', // Replace with a default image URL if necessary
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
