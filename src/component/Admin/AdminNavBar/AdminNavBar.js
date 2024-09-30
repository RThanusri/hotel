import React, { useState } from "react";
import "./AdminNavBar.css";
import { Link } from "react-router-dom";
const AdminNavBar = () => {
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
          <Link to="/booking" onClick={() => setMenu("bookings")}>
            Bookings
          </Link>
        </li>
        <li className={menu === "reviews" ? "active" : ""}>
          <Link to="/AdminReview" onClick={() => setMenu("reviews")}>
            Reviews
          </Link>
        </li>
        <li className={menu === "hotels" ? "active" : ""}>
          <Link to="/Hotel" onClick={() => setMenu("hotels")}>
            Hotels
          </Link>
        </li>
        <li className={menu === "hotelOwners" ? "active" : ""}>
          <Link to="/HotelOwner" onClick={() => setMenu("hotelOwners")}>
            HotelOwners
          </Link>
        </li>
        <li className={menu === "users" ? "active" : ""}>
          <Link to="/users" onClick={() => setMenu("users")}>
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavBar;