import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://stock-tracker-backend-162a.onrender.com/api/auth/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Error: " + err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required /><br />
      <input name="email" placeholder="Email" onChange={handleChange} required /><br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
