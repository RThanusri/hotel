import React, { useState } from "react";
import "./OwnerNavBar.css";
import { Link, useNavigate } from "react-router-dom";

const OwnerNavBar = () => {
  const [menu, setMenu] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    setAlertType("success");
    setAlertMsg("Logged out successfully!");
    setShowAlert(true);
    navigate("/");

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="owner-Navbar"style={{width: '160px'}}>
      <img src="../logo1.jpeg" alt="Logo" className="logo" />
      <ul className="owner-navbar-menu">
        <li className={menu === "bookings" ? "active" : ""}>
          <Link to="/ownerBooking" onClick={() => setMenu("bookings")}>
            Bookings
          </Link>
        </li>
        <li className={menu === "reviews" ? "active" : ""}>
          <Link to="/OwnerReview" onClick={() => setMenu("reviews")}>
            Reviews
          </Link>
        </li>
        <li className={menu === "hotels" ? "active" : ""}>
          <Link to="/hotelByOwner" onClick={() => setMenu("hotels")}>
            Hotels
          </Link>
        </li>
      </ul>
      <div className="ownernavbar-right1" >
        <button onClick={logout}>Log Out</button>
      </div>

      {showAlert && (
        <div className={`alert ${alertType}`}>
          {alertMsg}
        </div>
      )}
    </div>
  );
};

export default OwnerNavBar;
