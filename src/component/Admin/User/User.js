import React, { useState, useEffect } from "react";
import UserCard from "./UserCard"; 
import axios from "axios"; 
import './User.css';
import { Alert, TextField, Button, Container, Box } from "@mui/material"; 
import AdminNavBar from "../AdminNavBar/AdminNavBar";

const User = () => {
  const [users, setUsers] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [alertMsg, setAlertMsg] = useState(''); 
  const [alertType, setAlertType] = useState(''); 
  const [showAlert, setShowAlert] = useState(false); 

  const getUsers = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/admin/allUsersWithRoleUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data); 
      })
      .catch((error) => {
        setAlertType('error');
        setAlertMsg('There was an error fetching the users!');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  const handleSearch = () => {
    const searchValue = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.userName.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
    );
    setFilteredUsers(filtered); 
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
        getUsers(); 
      })
      .catch((error) => {
        setAlertType('error');
        setAlertMsg('There was an error removing the user!');
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  useEffect(() => {
    getUsers(); 
  }, []);

  return (
    <>
      <AdminNavBar />
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

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "1200px",
          padding: 0,
        }}
      >
        <Box sx={{ my: 4, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <TextField
            variant="outlined"
            placeholder="Search by User Name or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            sx={{ mr: 2 }} 
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ backgroundColor: "#cc0000", color: "white", "&:hover": { backgroundColor: "#b30000" } }}
          >
            Search
          </Button>
        </Box>

        <div className="user-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center',marginTop:'100px' }}>
          {(searchTerm ? filteredUsers : users).map((user) => (
            <UserCard
              key={user.userId}
              {...user}
              remove={() => removeUser(user.userId)} 
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default User;
