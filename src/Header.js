import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import IconButton from "@mui/material/IconButton";
import Navbar from "./components/navbar";
import { Link } from "react-router-dom";
import "./components/style.css";

function Header() {
  return (
    <div className="header">
      {/* App Logo */}
      <h1 className="app-logo">Kindred</h1>
      <Navbar />
    </div>
  );
}

export default Header;
