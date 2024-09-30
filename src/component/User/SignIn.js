import React, { useState, useEffect } from "react";
import { FormField, Button, Form } from "semantic-ui-react";
import { Modal, Box, Snackbar, Alert } from "@mui/material";
import './SignIn.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = ({ open, handleClose, openSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Your session has expired. Please log in to continue.");
    }
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    const login = { email, password };

    axios
      .post("http://localhost:8081/api/auth/login", login)
      .then((response) => {
        const token = response.data.jwt;
        const userId = response.data.userId;
        const role = response.data.role;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("Role", role);
        setSuccessMessage("Login Successful");
        handleClose();
        if (role === 'USER') nav('/');
        else if (role === 'ADMIN') nav('/admin');
      })
      .catch((error) => {
        
          setErrorMessage("Login failed! Please check your credentials.");
        }
      );
  };

  const handleSnackbarClose = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <span
            onClick={handleClose}
            className="close-btn"
            style={{ cursor: "pointer", color: "#cc0000" }}
          >
            X
          </span>
          <center>
            <h1 style={{ color: '#cc0000' }} className="title">Login</h1>
          </center>
          <Form onSubmit={handleSignIn}>
            <FormField>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>
            <FormField>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormField>
            <Button type="submit" className="submit">
              Login
            </Button>
            <div className="login" style={{ fontSize: '1.3rem' }}>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  handleClose();
                  openSignUp();
                }}
                className="login-navigation"
                style={{ fontSize: '1.5rem', cursor: "pointer", color: "#cc0000", textDecoration: "underline" }}
              >
                Register Here
              </span>
            </div>
          </Form>
        </Box>
      </Modal>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at top
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at top
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignIn;
