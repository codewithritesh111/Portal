import React, { useState } from 'react';

const AddSmesForm = ({ addUser, onClose }) => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [account, setAccount] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [profession, setProfession] = useState('');
  const [w3profile, setW3profile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect the form data into an object
    const newUser = {
      name,
      img,
      email,
      username,
      account,
      phoneType,
      phoneNumber,
      location,
      profession,
      w3profile
    };

    // Call the addUser function passed as a prop
    addUser(newUser);

    // Close the form
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>Add a New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              className="form-control"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Account:</label>
            <input
              type="text"
              className="form-control"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone Type:</label>
            <input
              type="text"
              className="form-control"
              value={phoneType}
              onChange={(e) => setPhoneType(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Profession:</label>
            <input
              type="text"
              className="form-control"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>W3 Profile:</label>
            <input
              type="text"
              className="form-control"
              value={w3profile}
              onChange={(e) => setW3profile(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSmesForm;
