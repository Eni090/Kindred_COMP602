import React from "react";
import "../components/navbar.css";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  //Navbar
  const [active, setActive] = useState("nav-menu");
  const navToggle = () => {
    active === "nav-menu"
      ? setActive("nav-menu nav-active")
      : setActive("nav-menu");

    //togglerIcon

    toggleIcon === "nav-toggler"
      ? setToggleIcon("nav-toggler toggle")
      : setToggleIcon("nav-toggler");
  };
  const [toggleIcon, setToggleIcon] = useState("nav-toggler");

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
      <ul className={active}>
        <li className="nav-item">
          <Link to ="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
        <Link to ="/contact" className="nav-link">
            Contact
          </Link>
        </li>
        <li className="nav-item">
        <Link to ="/profile" className="nav-link">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
    </>
  );
}

export default Navbar;
