import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminNavBar = () => {
  const [menu, setMenu] = useState("");

  const styles = {
    body: {
      margin: 0,
      fontFamily: "Arial, sans-serif",
    },
    navbar: {
      width: "240px",
      height: "100vh",
      
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
    },
    logo: {
      width: "150px",
      height: "auto",
      marginTop: "40px",
      
    },
    menu: {
      listStyleType: "none",
      padding: 0,
      margin: 0,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop:'60px',
      gap:'100px'
    },
    menuItem: {
      width: "100%",
      padding: "15px 0",
      cursor: "pointer",
      color: "red",
      fontSize: "18px",
      textAlign: "center",
      borderBottom: "1px solid transparent",
      boxSizing: "border-box",
      display: "block",
      
    },
    activeMenuItem: {
      paddingBottom: '0px',
      color: "#000000",
      textDecoration: "underline",
    },
    menuItemHover: {
      color: "#000000",
    },
    link: {
      textDecoration: "none",
      color: "inherit",
      width: "100%",
      display: "block",
      height: "100%",
    },
  };

  return (
    <div style={styles.navbar}>
      <img
        src="../logo1.jpeg"
        alt="Logo"
        style={styles.logo}
      />
      <ul style={styles.menu}>
        {["bookings", "reviews", "hotels", "hotelOwners", "users"].map((item) => (
          <li
            key={item}
            style={{
              ...styles.menuItem,
              ...(menu === item ? styles.activeMenuItem : {}),
            }}
          >
            <Link
              to={`/${item === "hotelOwners" ? "HotelOwners" : item}`}
              onClick={() => setMenu(item)}
              style={styles.link}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)} {/* Capitalize first letter */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNavBar;
