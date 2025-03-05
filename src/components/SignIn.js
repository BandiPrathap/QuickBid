
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();      
    if (!username) {
      toast.error("Please enter your email.");
      return;
    }
    else if (!password){
      toast.error("Please enter your password.");
      return;
    }

    const user = {
      email: username,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:5000/auth/login", user);
      const { token, message } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        toast.success("Login Successful!");
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Login failed! Please check your credentials and try again.");
    }
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="sign-in mt-5">
      <div className="container">
      <h2>Sign In</h2>
      <form id="signInForm" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="d-flex flex-row justify-content-between">
          <div className="show-password">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={handleShowPasswordChange}
              className="mt-3"
            />
            <label htmlFor="showPassword" className="mt-1">Show Password</label>
          </div>
          
        </div>
        

        <button className="btn btn-warning text-light" type="submit">
          Sign In
        </button>
      </form>

      <p className="note">
        Don't have an account?
        <span><Link to='/signup' className="text-danger"> Sign Up</Link></span>
      </p>

      <ToastContainer />
    </div>
    </div>
    
    
  );
};

export default SignIn;
