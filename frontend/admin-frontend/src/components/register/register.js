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


  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,   //whatever atrr you wanted to change will be referred to as 'name' and value will be its updated value
    });

    setErrors((prevErrors) => ({    //rmv err when user starts typing
      ...prevErrors,
      [name]: false,
    }));

  };


  const validateForm = () => {
    let isValid = true;
    const updatedErrors = { ...errors };
  
    // Validate name
    if (!/^[A-Za-z]+$/.test(user.name)) {  //expression /^[A-Za-z]+$/ is used to match only alphabets in the name field. If the name field  contains any non-alphabetic characters, it will be considered invalid
      updatedErrors.name = true;
      isValid = false;
    } else {
      updatedErrors.name = false;
    }
  
    // Validate email
    if (!user.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      updatedErrors.email = true;
      isValid = false;
    } else {
      updatedErrors.email = false;
    }
  
    // Validate password
    if (user.password.length < 6) {
      updatedErrors.password = true;
      isValid = false;
    } else {
      updatedErrors.password = false;
    }
  
    setErrors(updatedErrors);
    return isValid;
  };
  


  const register = () => {
    if (validateForm()) {
      axios
        .post("http://localhost:5000/user/api/register", user)
        .then((res) => {
          alert(res.data.message);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error while registering user:", error);
          alert("An error occurred during registration. Please try again.");
        });
    } else {
      alert("Please enter valid input in all fields.");
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
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        value={user.name}
                        onChange={handleChange}
                        name="name"
                      />
                      {errors.name && <div className="invalid-feedback">Please enter a valid name</div>}
                      {/* <br></br> */}
                    </div>
                    <div className="form-group">
                      <input
                        id="inputEmail"
                        type="email"
                        placeholder="Email address"
                        required
                        autoFocus
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        value={user.email}
                        onChange={handleChange}
                        name="email"
                      />
                      {errors.email && <div className="invalid-feedback">Please enter a valid email address.</div>}
                      {/* <br></br> */}
                    </div>
                    <div className="form-group">
                      <input
                        id="inputPassword"
                        type="password"
                        placeholder="Password"
                        required
                        className={`form-control form-control-md ${errors.password ? "is-invalid" : ""}`}
                        value={user.password}
                        onChange={handleChange}
                        name="password"
                      />
                      {errors.password && <div className="invalid-feedback">Please enter a password with at least 6 characters.</div>}
                      {/* <br></br> */}
                    </div>
                    <div className="form-group" style={{marginBottom:"5px"}}>
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