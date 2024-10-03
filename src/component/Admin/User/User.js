import React, { useState, useEffect } from "react";
import UserCard from "./UserCard"; // Ensure this is the correct import path
import axios from "axios"; // Import axios
import './User.css';
import { Alert } from "@mui/material"; // Import Alert from MUI
import AdminNavBar from "../AdminNavBar/AdminNavBar";

const User = () => {
  const [users, setUsers] = useState([]); // Initialize with an empty array
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [alertMsg, setAlertMsg] = useState(''); // Message for success/error alerts
  const [alertType, setAlertType] = useState(''); // Type for alert severity (success, error)
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alerts

  const getUsers = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/admin/allUsersWithRoleUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data); // Set the users to the state
      })
      .catch((error) => {
        setAlertType('error');
        setAlertMsg('There was an error fetching the users!');
        setShowAlert(true);
        // Hide alert after 3 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  // Search users based on userName or email
  const handleSearch = () => {
    const searchValue = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.userName.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
    );
    setFilteredUsers(filtered); // Set filtered users
  };

  const removeUser = (id) => {
    const token = localStorage.getItem("token");
    
    axios
      .delete(`http://localhost:8080/api/shared/deleteAccount/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlertType('success');
        setAlertMsg('User removed successfully');
        setShowAlert(true);
        getUsers(); // Refresh user list after deletion
      })
      .catch((error) => {
        setAlertType('error');
        setAlertMsg('There was an error removing the user!');
        setShowAlert(true);
      })
      .finally(() => {
        // Hide alert after 3 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  // Fetch all users on component mount
  useEffect(() => {
    getUsers(); // Call the function to get all users
  }, []);

  return (
    <>
    <AdminNavBar/>
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

      <div className="user-container">
        <input
          type="text"
          placeholder="Search by User Name or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>

        {searchTerm
          ? filteredUsers.map((user) => (
              <UserCard
                key={user.userId}
                {...user}
                remove={() => removeUser(user.userId)} 
              />
            ))
          : users.map((user) => (
              <UserCard
                key={user.userId}
                {...user}
                remove={() => removeUser(user.userId)} 
              />
            ))}
      </div>
    </>
  );
};

export default User;
