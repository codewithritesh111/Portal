import React from 'react';
import { useParams } from 'react-router-dom';
import './View.css'; // Reusing the same CSS for consistent styling

const TeamPage = () => {
  const { teams } = useParams(); // Get the number of teams from the URL

  // Generate an array with the number of teams
  const teamArray = Array.from({ length: parseInt(teams) }, (_, i) => i + 1);

  return (
    <div className="container">
      <div className="row">
        {teamArray.map((team, index) => (
          <div key={index} className="col-md-3 mb-3"> {/* 4 columns in a row */}
            <div className="card" style={{ width: '100%' }}>
              <div className="card-body">
                <h5 className="card-title">Team {team}</h5>
                <p className="card-text">
                  This is team number {team}.
                </p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
