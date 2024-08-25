import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import AddSmesForm from './AddSmesForm'; // Import the AddUserForm component
import './style.css'; // Assuming you have some styles for the modal and other elements

const SMEScreen = () => {
  const { id } = useParams(); // Extract the team ID from the URL
  const [teams, setTeams] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // State to manage form visibility

  useEffect(() => {
    // Fetch users associated with the team ID
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/update/getSmes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'model-id': id, // Ensure id is not undefined
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setTeams(data);
        console.log(teams)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    if (id) { // Ensure id is not null or undefined
      fetchUsers();
    }
  }, [id]);
  

  const addUser = async (property) => {
    const {name,img,email,username,account,phoneType,phoneNumber,location,profession, w3profile} = property
    try {
      const response = await fetch('http://localhost:5000/update/postSmes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'model-id': id, // Pass the team ID as a header
        },
        body: JSON.stringify({ name,img,email,username,account,phoneType,phoneNumber,location,profession, w3profile }), // Send name and role in the request body
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
    <div className=''>
      <div className="cardheader">
        <div className="add">
          {/* Button to open the form modal */}
          <button
            onClick={() => setIsFormVisible(true)}
            className="btn btn-secondary mb-4"
          >
            Add New Smes
          </button>

          {/* Render the form as a popup if visible */}
          {isFormVisible && (
            <AddSmesForm
              addUser={addUser}
              onClose={() => setIsFormVisible(false)}
            />
          )}
        </div>
      </div>

      <hr />

          <h1 className='heading'>SMEs</h1>
          <hr/>
          <div className='allcards'>


          {teams.map((smes)=>(
            
              <Card smes={smes}  key={smes._id}/>
            
          ))}

      </div>
    </div>
  );
};


export default SMEScreen;