import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "../User/SignUp";
import SignIn from "../User/SignIn";
import { Alert } from "@mui/material"; // Import Alert from MUI

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    // Show success alert on logout
    setAlertType("success");
    setAlertMsg("Logged out successfully!");
    setShowAlert(true);
    nav("/");

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="Navbar">
      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
            width: "320px",
          }}
        >
          <Alert severity={alertType}>{alertMsg}</Alert>
        </div>
      )}

      <img src="../logo1.jpeg" alt="logo" className="logo" />
      <ul className="navbar-menu">
        <li className={menu === "home" ? "active" : ""}>
          <Link to="/" onClick={() => setMenu("home")}>
            Home
          </Link>
        </li>
        <li className={menu === "hotels" ? "active" : ""}>
          <Link to="/AllHotels" onClick={() => setMenu("hotels")}>
            Hotels
          </Link>
        </li>
        <li className={menu === "viewBooking" ? "active" : ""}>
          <Link to="/viewBooking" onClick={() => setMenu("viewBooking")}>
            View Bookings
          </Link>
        </li>
        <li className={menu === "about-us" ? "active" : ""}>
          <Link to="/About" onClick={() => setMenu("about-us")}>
            About Us
          </Link>
        </li>
        <li className={menu === "contact-us" ? "active" : ""}>
          <Link to="/Contact" onClick={() => setMenu("contact-us")}>
            Contact Us
          </Link>
        </li>
      </ul>

      <div className="navbar-right">
        <button
          className="full-width-button"
          onClick={() => setSignUpModalOpen(true)}
        >
          Sign Up
        </button>
        <button
          className="Nav-right"
          onClick={() => setSignInModalOpen(true)}
        >
          Sign In
        </button>
        <SignUp
          open={signUpModalOpen}
          handleClose={() => setSignUpModalOpen(false)}
          handleOpenSignIn={() => {
            setSignUpModalOpen(false);
            setSignInModalOpen(true);
          }}
        />
        <SignIn
          open={signInModalOpen}
          handleClose={() => setSignInModalOpen(false)}
          openSignUp={() => {
            setSignInModalOpen(false);
            setSignUpModalOpen(true);
          }}
        />
      </div>

      <div className="navbar-right1">
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
};

export default Navbar;
