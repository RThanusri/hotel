import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminNavBar.css"; // Ensure to create this CSS file for styles

const AdminNavBar = () => {
  const [menu, setMenu] = useState("");

  return (
    <div className="Admin-Navbar">
      <img
        src="../logo1.jpeg"
        alt="Logo"
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
          <Link to="/hotels" onClick={() => setMenu("hotels")}>
            Hotels
          </Link>
        </li>
        <li className={menu === "hotelOwners" ? "active" : ""}>
          <Link to="/hotelOwners" onClick={() => setMenu("hotelOwners")}>
            Hotel Owners
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
