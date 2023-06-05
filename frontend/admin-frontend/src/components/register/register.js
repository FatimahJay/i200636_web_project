import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
import logo from "../logo.png";
import React, { useState } from "react";
import axios from "axios";  //for posting to backend
import { useNavigate } from "react-router-dom"; //for navigation

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({   
    //setting initial state
    name: "",
    email: "",
    password: "",
    role: "customer", // set a default value for role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,   //whatever atrr you wanted to change will be referred to as 'name' and value will be its updated value
    });
  };

  const register = () => {
    const { name, email, password, role } = user;  //destructure user obj values into individual vars
    if (name && email && password && role) {  //if all present
      axios
        .post("http://localhost:5000/user/api/register", user)
        .then((res) => {
          alert(res.data.message); 
          navigate("/login");  //a way to programmatically change the URL of the browser and navigate to a different page
        });
    } else {
      alert("Enter all fields!");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex bg-image1"></div>
        <div className="col-md-6 bg-light">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 mx-auto">
                  <div className="d-flex align-items-center mb-4">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1 className="ml-2">Global Marketplace</h1>
                  </div>
                  <br></br>
                  <h3>Register Form</h3>
                  <br></br>
                  <form>
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
                      <br></br>
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
                      <br></br>
                    </div>
                    <div className="form-group">
                      <input
                        id="inputPassword"
                        type="password"
                        placeholder="Password"
                        required
                        className="form-control form-control-md"
                        value={user.password}
                        onChange={handleChange}
                        name="password"
                      />
                      <br></br>
                    </div>
                    <div className="form-group">
                      <select
                        id="inputRole"
                        className="form-control"
                        value={user.role}
                        onChange={handleChange}
                        name="role"
                      >
                        <option value="customer" default>
                          Customer
                        </option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin</option>
                      </select>
                      <br></br>
                    </div>
                    <button
                      type="button"
                      className="btn btn-dark btn-block text-uppercase mb-2  shadow-sm"
                      onClick={register}
                    >
                      Register
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-info btn-block text-uppercase mb-2  shadow-sm"
                      onClick={() => navigate("/login")}
                    >
                      Login
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

export default Register;