import React, { useState } from 'react';
import { FormField, Button, Form, Dropdown } from 'semantic-ui-react';
import { Modal, Box } from '@mui/material';
import axios from 'axios';
import { Alert } from "@mui/material"; // Import Alert from MUI
import './SignUp.css';

const SignUp = ({ open, handleClose, handleOpenSignIn }) => {
  const roleOptions = [
    { key: 'USER', text: 'User', value: 'USER' },
    { key: 'HOTEL_OWNER', text: 'Hotel Owner', value: 'HOTEL_OWNER' },
    { key: 'ADMIN', text: 'Admin', value: 'ADMIN' },
  ];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  // Alert state
  const [alertMsg, setAlertMsg] = useState(''); // Message for alerts
  const [alertType, setAlertType] = useState(''); // Type for alert severity (success, error)
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alerts

  const handleSignUp = (e) => {
    e.preventDefault();
    const user = { name, email, password, role };

    axios.post('http://localhost:8080/api/auth/signup', user)
      .then(() => {
        setAlertType('success');
        setAlertMsg('Sign Up Successful! You can login now.');
        setShowAlert(true);
        handleClose(); 
      })
      .catch(() => {
        setAlertType('error');
        setAlertMsg('Signup failed! Please try again.');
        setShowAlert(true);
      })
      .finally(() => {
        // Hide alert after 3 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  return (
    <>
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

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <span 
            onClick={() => handleClose()} 
            className="close-btn"
            style={{ cursor: "pointer", color: "#cc0000"}}
          >
            X
          </span>
          <center>
            <h1 style={{ color: "#cc0000"}} className="title">Sign Up</h1>
          </center>
          <Form onSubmit={handleSignUp}>
            <FormField>
              <label>Name</label>
              <input
                type="text"
                placeholder='Name'
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormField>
            <FormField>
              <label>Email</label>
              <input
                type="email"
                placeholder='Email'
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>
            <FormField>
              <label>Password</label>
              <input
                type="password"
                placeholder='Password'
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormField>
            <FormField>
              <label>Role</label>
              <Dropdown
                placeholder='Select Role'
                options={roleOptions}
                className="form-dropdown"
                value={role}
                onChange={(e, { value }) => setRole(value)}
                selection
              />
            </FormField>
            <Button type='submit' className='submit'>Submit</Button>
            <div className="login" style={{ fontSize:'1.3rem'}}>
              Already have an account?  
              <span 
                onClick={() => {
                  handleClose();
                  handleOpenSignIn(); 
                }} 
                className="login-navigation"
                style={{ fontSize:'1.5rem', cursor: "pointer", color: "#cc0000", textDecoration: "underline" }}
              >
                Login
              </span>
            </div>
          </Form>
        </Box>
      </Modal>
    </>
  );
};

export default SignUp;
