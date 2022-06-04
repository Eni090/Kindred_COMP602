import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "./firebase";
import GoogleButton from "react-google-button";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./style.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const { login, googleSignIn } = useAuth();
  const nav = useNavigate();

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(database, "users", result.user.uid), {
        isOnline: true,
      });
      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      nav("/home");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();

    try {
      await googleSignIn();
      nav("/home");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };

  const paperStyle = { padding: 20, height: "60vh", margin: "20px auto" };
  const avatarStyle = { backgroundColor: "blue" };
  const accountStyle = { margin: 10, width: 340, align: "center" };
  const signInStyle = { marginBottom: 35, marginTop: 10 };

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Welcome to Kindred</h2>
          </Grid>
          <div className = "account-container">
            <TextField
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Username"
              label="Username"
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
            style={signInStyle}
            fullWidth
          >
            Login
          </Button>
          <div>
            <GoogleButton
              className="g-btn w-100"
              type="dark"
              onClick={handleGoogleSignIn}
            />
          </div>
          <div className = "register-button">
            <h2 align="center">Don't Have Account Yet?</h2>
            <Link to="/signup">
              <Button variant="contained" fullWidth>
                Register
              </Button>
            </Link>
          </div>
        </Paper>
      </Grid>
    </form>
  );
};

export default Login;
