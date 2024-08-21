import React from 'react';
import './App.css';
import View from './Components/View/View'; // Adjusted import path
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Team from './Components/Team';
import User from './Components/User';
import Model from './Components/Model';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<View />} />
        <Route path="/teams/:id" element={<Team />} /> {/* Match the team path */}
        <Route path="/user/:id" element={<User />} /> {/* Match the team path */}
        <Route path="/model/:id" element={<Model />} /> {/* Match the team path */}
      </Routes>
    </Router>
  );
}

export default App;
