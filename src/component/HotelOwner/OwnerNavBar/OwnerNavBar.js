import React, { useState } from "react";
import "./OwnerNavBar.css";
import { Link } from "react-router-dom";
const OwnerNavBar = () => {
  const [menu, setMenu] = useState("");

  return (
    <div className="Admin-Navbar">
      <img
        src="../logo1.jpeg"
        alt=""
        className="logo"
      />
      <ul className="Admin-navbar-menu">
        <li className={menu === "bookings" ? "active" : ""}>
          <Link to="/ownerBooking" onClick={() => setMenu("bookings")}>
            Bookings
          </Link>
        </li>
        <li className={menu === "reviews" ? "active" : ""}>
          <Link to="/AdminReview" onClick={() => setMenu("reviews")}>
            Reviews
          </Link>
        </li>
        <li className={menu === "hotels" ? "active" : ""}>
          <Link to="/hotelByOwner" onClick={() => setMenu("hotels")}>
            Hotels
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OwnerNavBar;