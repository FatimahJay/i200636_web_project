import React from 'react';
import './App.css';
import Register from './components/register/register';
import Login from './components/login/login';
import Homepage from './components/homepage/homepage';
// import EditProfile from './components/editProfile/editProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/edit-profile" element={<EditProfile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;