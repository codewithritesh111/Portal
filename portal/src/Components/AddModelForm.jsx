// AddModelForm.jsx
import React, { useState } from 'react';
import './AddModelForm.css'; // Import CSS for styling

const AddModelForm = ({ id, models, setModels, onClose }) => {
  const [modelName, setModelName] = useState('');

  const addModel = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/update/postModel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'model-id': id,
        },
        body: JSON.stringify({ name: modelName }),
      });

      const data = await response.json();

      if (response.ok) {
        setModels([...models, data]);
        setModelName('');
        onClose(); // Close the modal after adding a model
      } else {
        console.error('Error adding submodel:', data.error);
      }
    } catch (error) {
      console.error('Error adding submodel:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={addModel}>
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
    </div>
  );
};

export default AddModelForm;
