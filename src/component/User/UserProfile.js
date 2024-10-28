import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Alert, Snackbar } from "@mui/material";
import axios from "axios";

const UserProfile = ({ open, handleClose }) => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
  });

  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (userId) {
      axios
        .get(`http://localhost:8080/api/shared/userDetailsById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          showAlert("Failed to fetch user data", "error");
        });
    }
  }, []);

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleUpdate = () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    axios
      .put(
        `http://localhost:8080/api/shared/userDetailsById/${userId}/${user.userName}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        showAlert("User details updated successfully", "success");
        handleClose(); // Close the modal after update
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        showAlert("Failed to update user data", "error");
      });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>User Profile</h2>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.email}
            disabled
          />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Modal>

      {/* Snackbar for alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserProfile;
