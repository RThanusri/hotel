import React, { useState, useEffect } from "react";
import UserCard from "../User/UserCard"; 
import axios from "axios"; 
import { Alert, TextField, Button, Container, Box } from "@mui/material"; 
import './HotelOwner.css';

const HotelOwner = () => {
  const [owners, setOwners] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [alertMsg, setAlertMsg] = useState(''); 
  const [alertType, setAlertType] = useState(''); 
  const [showAlert, setShowAlert] = useState(false); 

  const getUsers = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/admin/allUsersWithRoleHotelOwner", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOwners(response.data); 
      })
      .catch((error) => {
        setAlertType('error');
        setAlertMsg('There was an error fetching the users!');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        console.error("There was an error fetching the users!", error);
      });
  };

  const handleSearch = () => {
    const searchValue = searchTerm.toLowerCase();
    const filtered = owners.filter(
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
        console.error("There was an error removing the user!", error);
      })
      .finally(() => {
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  useEffect(() => {
    getUsers(); 
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "1200px",
        padding: 0, // Remove default padding
        border: 'none', // Remove border
      
      }}
    >
      {showAlert && (
        <Alert severity={alertType}>{alertMsg}</Alert>
      )}

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
        {(searchTerm ? filteredUsers : owners).map((user) => (
          <UserCard
            key={user.userId}
            {...user}
            remove={() => removeUser(user.userId)} 
          />
        ))}
      </div>
    </Container>
  );
};

export default HotelOwner;
