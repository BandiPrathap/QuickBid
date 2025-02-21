import React, { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "./auth.css";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("", user);
      const { message } = response.data;
      toast.success(message);

      setTimeout(() => {
        if (message!=="The email address already exists"){
          navigate('/verify-otp',{state:{email}});
        }
        
      }, 2000);


    } catch (error) {
      toast.warning("The email is already exists");
    }
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <h2>Registration</h2>
      <p className="note text-secondary">
        Already have an account?
        <span><Link to='/signin' className="text-danger"> Sign In</Link></span>
      </p>
      <form id="registrationForm" onSubmit={handleRegister}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          required
        />


        <button className="btn btn-warning text-light" type="submit">
          Register
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default SignUpPage;