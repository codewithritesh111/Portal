import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './View.css';
import Nav from '../Nav.js';

const View = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/update/getProduct');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    try {
      const response = await fetch('http://localhost:5000/update/postProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: productName }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the products list with the new product
        setProducts([...products, data.product]);
        // Clear the form
        setProductName('');
      } else {
        console.error('Error adding product:', data.error);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <Nav />
      <div className="container">
        {/* Add Product Form */}
        <form onSubmit={addProduct} className="mb-4">
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

        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card" style={{ width: '18rem', margin: 'auto' }}>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Description or other details about the product</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/teams/${product._id}`)}
                  >
                    View Team
                  </button>
                  <br />
                  <br />
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/model/${product._id}`)}
                  >
                    View Modules
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default View;
