import React from 'react';
import './App.css';
import Register from './components/register/register';
import Login from './components/login/login';
import Homepage from './components/homepage/homepage';
import EditProfile from './components/editprofile/editprofile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/admindashboard/admindashboard'
import ViewBrand from './components/manageBrand/managebrand'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/editprofile/:userId" element={<EditProfile />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        {/* <Route path="/viewbrand" element={<ViewBrand />} /> */}
      </Routes>
    </Router>
  );
}

export default App;