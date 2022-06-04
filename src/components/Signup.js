import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "./firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import "./style.css";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  const { name, email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(database, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      navigate("/");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  const paperStyle = { padding: 20, height: "60vh", margin: "20px auto" };
  const avatarStyle = { backgroundColor: "blue" };
  const accountStyle = { margin: 10, width: 340, align: "center" };
  const signUpStyle = { marginBottom: 35, height: 50};
  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <h2 className = "register-title">Register</h2>
          </Grid>
          <div className="register-details">
            <TextField 
              type="text"
              name = "name"
              value={name}
              onChange={handleChange}
              placeholder="Enter name"
              label="Full Name"
              style={accountStyle}
              fullWidth/>
              
            <TextField
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Email"
              label="Email"
              style={accountStyle}
              fullWidth
            />
            <TextField
              type="password"
              name="password"
              value={password}
              label="Password"
              onChange={handleChange}
              placeholder="Enter Password"
              style={accountStyle}
            />
          </div>
          {error ? <p className="error">{error}</p> : null}
          <Button
            disabled={loading}
            type="submit"
            color="primary"
            variant="contained"
            style={signUpStyle}
            fullWidth
          >
            SignUp
          </Button>
          <div className="already-account">
           <h5>Already have an account? <Link to="/">Log In</Link></h5> 
          </div>
        </Paper>
      </Grid>
    </form>
  );
};

export default Signup;
