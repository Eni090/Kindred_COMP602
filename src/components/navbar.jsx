import React from "react";
import "../components/navbar.css";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { database, auth } from "./firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";

function Navbar() {
  const handleSignout = async () => {
    await updateDoc(doc(database, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
  };
  
  //Navbar
  const [active, setActive] = useState("nav-menu");
  const [toggleIcon, setToggleIcon] = useState("nav-toggler");

  const navToggle = () => {
    active === "nav-menu" ? setActive("nav-menu nav-active") : setActive("nav-menu");
    //togglerIcon
    toggleIcon === "nav-toggler" ? setToggleIcon("nav-toggler toggle") : setToggleIcon("nav-toggler");
  };
  
  return (
    <>
      <nav className="nav">
        <div className="header-container">
          <div onClick={navToggle} className={toggleIcon}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </div>
      </nav>
      <ul className={active}>
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">Profile</Link>
        </li>
        <li className="nav-item" onClick={handleSignout}>
          <Link to="/" className="nav-link">Logout</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default Navbar;
