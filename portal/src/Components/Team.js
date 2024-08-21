import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Team = () => {
  const { id } = useParams(); // Extract the model ID from the URL
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
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

  const addTeam = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
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
        // Clear the form
        setTeamName('');
      } else {
        console.error('Error adding team:', data.error);
      }
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  return (
    <div>
      <h2>Teams</h2>

      {/* Add Team Form */}
      <form onSubmit={addTeam} className="mb-4">
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

      <div className="container">
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/user/${team._id}`)}
                  >
                    View Members
                  </button>
                  {/* Add any additional team details here */}
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
