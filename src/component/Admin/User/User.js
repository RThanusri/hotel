import React, { useState, useEffect } from "react";
import UserCard from "./UserCard"; 
import axios from "axios"; 

import { Alert, TextField, Button, Box, Pagination } from "@mui/material"; 
import AdminNavBar from "../AdminNavBar/AdminNavBar";

const User = () => {
  const [users, setUsers] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [alertMsg, setAlertMsg] = useState(''); 
  const [alertType, setAlertType] = useState(''); 
  const [showAlert, setShowAlert] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6); // Number of users per page

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
    setCurrentPage(1); // Reset to first page on new search
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

  // Pagination Logic
  const totalUsers = searchTerm ? filteredUsers.length : users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = (searchTerm ? filteredUsers : users).slice(indexOfFirstUser, indexOfLastUser);

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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "1200px",
          padding: 2,
          margin: "0 auto",
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: 'none',
          my:-10
        }}
      >
        <Box sx={{ my: -10, display: "flex", justifyContent: "center", alignItems: "center", width: '100%',mb:3 }}>
          <TextField
            variant="outlined"
            placeholder="Search by User Name or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            sx={{ mr: 2, width: '300px' }} 
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ backgroundColor: "#cc0000", color: "white", "&:hover": { backgroundColor: "#b30000" } }}
          >
            Search
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          {currentUsers.map((user) => (
            <Box
              key={user.userId}
              sx={{
                margin: '10px',
                width: '300px',
                height: '250px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px',
              }}
            >
              <UserCard
                {...user}
                remove={() => removeUser(user.userId)} 
              />
            </Box>
          ))}
        </Box>

        {/* Pagination Component */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="error"
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default User;
