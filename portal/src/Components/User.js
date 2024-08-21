import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const Team = () => {
  const { id } = useParams(); // Extract the model ID from the URL
  const [teams, setTeams] = useState([]);
//   const navigate = useNavigate();

  useEffect(() => {
    // Fetch teams associated with the model ID
    fetch('http://localhost:5000/update/getUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'team-id': id, // Pass the model ID as a header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        console.log(teams)
      })
      .catch((error) => console.error('Error fetching teams:', error));
  }, [id]);

  return (
    <div>
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

// hello

