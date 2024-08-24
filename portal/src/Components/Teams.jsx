// Team.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddTeamForm from './AddTeamForm.jsx';


const Teams = () => {
  const { id } = useParams(); // Extract the model ID from the URL
  const [teams, setTeams] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // State to manage form visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch teams associated with the model ID
    fetch('http://localhost:5000/update/getTeam', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'model-id': id, // Pass the model ID as a header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => console.error('Error fetching teams:', error));
  }, [id]);

  const addTeam = async (teamName) => {
    try {
      const response = await fetch('http://localhost:5000/update/postTeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'model-id': id, // Pass the model ID as a header
        },
        body: JSON.stringify({ name: teamName }), // Send the team name in the body
      });

      const data = await response.json();

      if (response.ok) {
        // Update the teams list with the new team
        setTeams([...teams, data.teams]);
      } else {
        console.error('Error adding team:', data.error);
      }
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  return (
    <>
     <div className='cardheader'>
    

<div>
      <h1 className='heading'>Teams</h1>
      </div>
      <div className='add'>
        
       

        {/* Button to open the form modal */}
        <button
          onClick={() => setIsFormVisible(true)}
          className="btn btn-secondary mb-4"
        >
          Add New Team
        </button>

        {/* Render the form as a popup if visible */}
        {isFormVisible && (
          <AddTeamForm
            addTeam={addTeam}
            onClose={() => setIsFormVisible(false)}
          />
        )}
      </div>
     </div>
      <hr/>
      <div className="allcards">
        {teams.map((team) => (
          <div key={team._id} className="col-md-4 mb-4 profilecard">
            <div className="" style={{ width: '18rem', margin: 'auto' }}>
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <hr className="divider" />
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/user/${team._id}`)}
                >
                  View Members
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Teams;
