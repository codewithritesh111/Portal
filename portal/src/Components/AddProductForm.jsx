// AddProductForm.jsx
import React, { useState } from 'react';



const AddProductForm = ({ onClose, addProduct }) => {
  const [productName, setProductName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(productName);
    setProductName('');
    onClose(); // Close the modal after adding a product
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
