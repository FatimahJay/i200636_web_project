import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import logo from "../logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = { ...errors };

    // Validate email
    if (!user.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      updatedErrors.email = true;
      isValid = false;
    } else {
      updatedErrors.email = false;
    }

    // Validate password
    if (user.password === "") {
      updatedErrors.password = true;
      isValid = false;
    } else {
      updatedErrors.password = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };

  const login = async () => {
    if (validateForm()) {
      const { email, password } = user;
      try {
        const response = await axios.post("http://localhost:5000/user/api/login", {
          email,
          password
        });
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } catch (error) {
        console.error("Error while logging in: ", error);
        alert("An error occurred while logging in. Wrong email or password. Please try again.");
      }
    } else {
      alert("Please enter valid email and password.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex bg-image"></div>
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
                  <h3>Login Form</h3>
                  <br />
                  <form>
                    <div className="form-group ">
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
                      {errors.email && (
                        <div className="invalid-feedback">Please enter a valid email address.</div>
                      )}
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
                      {errors.password && (
                        <div className="invalid-feedback">Please enter a password.</div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn btn-dark btn-block text-uppercase mb-2  shadow-sm"
                      onClick={login}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-info btn-block text-uppercase mb-2  shadow-sm"
                      onClick={() => navigate("/register")}
                    >
                      Register
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

export default Login;
