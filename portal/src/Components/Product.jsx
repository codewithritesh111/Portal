// View.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './View.css';
import './style.css';
import Nav from './Nav.js';
import AddProductForm from './AddProductForm'; // Import the form component

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // State to manage form visibility
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

  const addProduct = async (productName) => {
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
      } else {
        console.error('Error adding product:', data.error);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className=''>
      <Nav />
      <div className='cardheader'>
      <div className='add'>
        {/* Button to open the form modal */}
        <button
          onClick={() => setIsFormVisible(true)}
          className="btn btn-secondary mb-4"
        >
          Add New Product
        </button>

        {/* Render the form as a popup if visible */}
        {isFormVisible && (
          <AddProductForm
            addProduct={addProduct}
            onClose={() => setIsFormVisible(false)}
          />
        )}
</div>

<div>
        <h1 className='heading'>Products</h1>
        </div>
        </div>

        <hr/>
        <div className="allcards">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4 profilecard">
              <div className="" style={{ width: '18rem', margin: 'auto' }}>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <hr className="divider" />
                  <p className="card-text">Description or other details about the product</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/smes/${product._id}`)}
                  >
                    View SME's
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
   
  );
};

export default Product;
