import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './View.css';

const View = () => {
  const [models, setModels] = useState([]);
  const [modelName, setModelName] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch submodels associated with the model ID
    fetch('http://localhost:5000/update/getModel', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'model-id': id, // Pass the model ID as a header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
      })
      .catch((error) => console.error('Error fetching models:', error));
  }, [id]);

  const addModel = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    try {
      const response = await fetch('http://localhost:5000/update/postModel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'model-id': id, // Pass the parent model ID as a header
        },
        body: JSON.stringify({ name: modelName }), // Send the submodel name in the body
      });

      const data = await response.json();

      if (response.ok) {
        // Update the models list with the new submodel
        setModels([...models, data]);
        // Clear the form
        setModelName('');
      } else {
        console.error('Error adding submodel:', data.error);
      }
    } catch (error) {
      console.error('Error adding submodel:', error);
    }
  };

  return (
    <div>
      
      <div className="container">
      <h1>Modules</h1>
      {/* Add Submodel Form */}
      <form onSubmit={addModel} className="mb-4">
        <div className="form-group">
          <label htmlFor="modelName">Submodel Name:</label>
          <input
            type="text"
            className="form-control"
            id="modelName"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Add Submodel
        </button>
      </form>
      </div>
      <h1 className='heading'>Modules</h1>
      <hr/>
        <div className=" allcards">
          {models.map((model) => (
            <div key={model._id} className="col-md-4 mb-4 profilecard">
              <div className="" style={{ width: '18rem', margin: 'auto' }}>
                <div className="card-body">
                  <h5 className="card-title">{model.name}</h5>
                  <hr className="divider" />
                  <p className="card-text">Description or other details about the product</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/teams/${model._id}`)}
                  >
                    View Team
                  </button>
                  {/* <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/model/${model._id}`)}
                  >
                    View Models
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
    
    </div>
  );
};

export default View;
