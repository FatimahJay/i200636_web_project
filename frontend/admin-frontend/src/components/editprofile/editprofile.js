// editprofile.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./editprofile.css";
import logo from "../logo.png";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function EditProfile({ usertoedit, setSelectedUser, handleCloseModal }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    if (usertoedit) {
      setUser({
        _id: usertoedit._id,
        name: usertoedit.name,
        email: usertoedit.email,
      });
    }
  }, [usertoedit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };



  const editUser = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email) {
      alert("Please fill all the fields.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please authenticate.");
        return;
      }
      const response = await axios.patch(
        `http://localhost:5000/user/api/edit/${user._id}`,
        user,
        { headers: { Authorization: `Bearer ${token}` } } // Include the token in the request headers
      );
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
  
      alert("Profile updated successfully");
      setSelectedUser(null);
      handleCloseModal();
      navigate("/admindashboard");
    } catch (error) {
      console.error("Error while updating profile: ", error);
    }
  };
  
  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex bg-image3"></div>
        <div className="col-md-6 bg-light">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 mx-auto">
                  <div className="d-flex align-items-center mb-4">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1 className="ml-2">Global Marketplace</h1>
                  </div>
                  <br />
                  <h3>Edit Profile</h3>
                  <br />
                  <form onSubmit={editUser}>
                    <div className="form-group ">
                      <input
                        id="userID"
                        type="text"
                        placeholder="ID"
                        required
                        autoFocus
                        className="form-control"
                        value={user._id}
                        onChange={handleChange}
                        readOnly
                      />
                      <br />
                    </div>
                    <div className="form-group ">
                      <input
                        id="inputName"
                        type="name"
                        placeholder="Name"
                        required
                        autoFocus
                        className="form-control"
                        value={user.name}
                        onChange={handleChange}
                        name="name"
                      />
                      <br />
                    </div>
                    <div className="form-group ">
                      <input
                        id="inputEmail"
                        type="email"
                        placeholder="Email address"
                        required
                        autoFocus
                        className="form-control"
                        value={user.email}
                        onChange={handleChange}
                        name="email"
                      />
                      <br />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-outline-dark btn-block text-uppercase mb-2  shadow-sm"
                    >
                      Save Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
