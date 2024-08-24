// View.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddModelForm from './AddModelForm';
import './View.css';
import './style.css';

const Module = () => {
  const [models, setModels] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch('http://localhost:5000/update/getModel', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'model-id': id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
      })
      .catch((error) => console.error('Error fetching models:', error));
  }, [id]);

  return (
    <div className="">


     <div className='cardheader'>

<div>
      <h1 className="heading">Modules</h1>
      </div>


      <div className='add'>
      <button
        onClick={() => setIsFormVisible(true)}
        className="btn btn-secondary  "
      >
        Add New Submodel
      </button>

      {/* Render the form as a popup if visible */}
      {isFormVisible && (
        <AddModelForm
          id={id}
          models={models}
          setModels={setModels}
          onClose={() => setIsFormVisible(false)}
        />
      )}
</div> 
     </div>
      <hr />
      <div className="allcards">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Module;
