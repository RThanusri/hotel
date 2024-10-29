import React, { useState } from "react";
import "./Navbar.css"; // Ensure your existing styles are still imported
import { Link, useNavigate } from "react-router-dom";
import SignUp from "../User/SignUp";
import SignIn from "../User/SignIn";
import UserProfile from "../User/UserProfile";
import { Alert } from "@mui/material";

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    setAlertType("success");
    setAlertMsg("Logged out successfully!");
    setShowAlert(true);

    setTimeout(() => {
      nav("/");
      setShowAlert(false);
    }, 1000);
  };

  const isLoggedIn = !!localStorage.getItem("token");

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
          <Link to="/" onClick={() => setMenu("home")}>Home</Link>
        </li>
        <li className={menu === "hotels" ? "active" : ""}>
          <Link to="/AllHotels" onClick={() => setMenu("hotels")}>Hotels</Link>
        </li>
        <li className={menu === "viewFavourites" ? "active" : ""}>
          <Link to="/viewFavourites" onClick={() => setMenu("viewFavourites")}>View Favourites</Link>
        </li>
        <li className={menu === "viewBooking" ? "active" : ""}>
          <Link to="/viewBooking" onClick={() => setMenu("viewBooking")}>View Bookings</Link>
        </li>
        <li className={menu === "about-us" ? "active" : ""}>
          <Link to="/About" onClick={() => setMenu("about-us")}>About Us</Link>
        </li>
        <li className={menu === "contact-us" ? "active" : ""}>
          <Link to="/Contact" onClick={() => setMenu("contact-us")}>Contact Us</Link>
        </li>
      </ul>

      <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '80px',marginRight:'150px' }}>
        {isLoggedIn ? (
          <>
            <button className="profile" onClick={() => setProfileModalOpen(true)}>
              Profile
            </button>
            <button className="logout"   onClick={logout}>Log Out</button>
          </>
        ) : (
          <>
            <button className="signup" onClick={() => setSignUpModalOpen(true)}>
              Sign Up
            </button>
            <button className="signin" onClick={() => setSignInModalOpen(true)}>
              Sign In
            </button>
          </>
        )}

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
        <UserProfile
          open={profileModalOpen}
          handleClose={() => setProfileModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Navbar;
