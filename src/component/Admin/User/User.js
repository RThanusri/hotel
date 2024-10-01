import React, { useState, useEffect } from "react";
import UserCard from "./UserCard"; // Ensure this is the correct import path
import axios from "axios"; // Import axios
import './User.css'

const User = () => {
  const [users, setUsers] = useState([]); // Initialize with an empty array
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [filteredUsers, setFilteredUsers] = useState([]);

  const getUsers = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:808/api/admin/allUsersWithRoleUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data); // Set the users to the state
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
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
    // const userId = localStorage.getItem("userId");
    axios
      .delete(`http://localhost:8080/api/shared/deleteAccount/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("User removed successfully");
        getUsers(); // Refresh user list after deletion
      })
      .catch((error) => {
        console.error("There was an error removing the user!", error);
      });
  };

  // Fetch all users on component mount
  useEffect(() => {
    getUsers(); // Call the function to get all users
  }, []);

  return (
    <>
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
          ))}</div>
    </>
  );
};

export default User;
