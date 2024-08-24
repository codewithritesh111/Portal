import React from 'react';
import './App.css';
import View from './Components/View/View'; // Adjusted import path
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Team from './Components/Team';
import User from './Components/User';
import Model from './Components/Model';
import SMEScreen from './Components/SMEScreen';
import Module from './Components/Module';
import Product from './Components/Product';
import Teams from './Components/Teams';

function App() {
  return (
    <Router>
      <Routes>
      
      <Route path="/smes" element={<SMEScreen/>} />
        <Route path="/" element={<Product />} />
        <Route path="/smes" element={<SMEScreen/>} />
        <Route path="/teams/:id" element={<Teams />} /> {/* Match the team path */}
        <Route path="/user/:id" element={<User />} /> {/* Match the team path */}
        <Route path="/model/:id" element={<Module />} /> {/* Match the team path */}
      </Routes>
    </Router>
  );
}

export default App;
