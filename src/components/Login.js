import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "./firebase";
import GoogleButton from "react-google-button";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";

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
  return (
    <section>
      <h3>Log into your Account</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button className="btn" disabled={loading}>
            Login
          </button>
        </div>
      </form>
      <div>
        <GoogleButton
          className="g-btn w-100"
          type="dark"
          onClick={handleGoogleSignIn}
        />
      </div>
      <div className="w-100 box mt-2 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </section>
  );
};

export default Login;
