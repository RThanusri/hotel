import React, { useEffect, useState } from "react";
import "./App.css";
import UserNavbar from "./component/User/UserNavBar";
import SRoutes from "./SRoutes";
import 'semantic-ui-css/semantic.min.css';
import SignIn from "./component/User/SignIn";

import { Snackbar, Alert } from '@mui/material'; 
import Owner from "./component/HotelOwner/Owner";
 

const SESSION_DURATION = 30 * 60 * 1000; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const loginTime = localStorage.getItem("loginTime");
      const currentTime = Date.now();
      if (loginTime && (currentTime - loginTime > SESSION_DURATION)) {
      
        setIsLoggedIn(false);
        setSessionExpired(true);
        setSignInOpen(true); 
      } else {
        setIsLoggedIn(true);
        setSessionExpired(false);
      }
    };

    checkSession(); 

    const intervalId = setInterval(checkSession, 30000); 

    return () => clearInterval(intervalId); 
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setSignInOpen(false);
    setSessionExpired(false);
    localStorage.setItem("loginTime", Date.now()); 
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    setIsLoggedIn(false);
    setSessionExpired(true); 
  };

  const handleCloseSnackbar = () => {
    setSessionExpired(false);
  };

  return (
    <div className="app">
      <UserNavbar onLogout={handleLogout} />
      <SRoutes />

      <Snackbar
        open={sessionExpired}
      
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' , position:'fixed'}} 
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Session Expired! Please log in again to continue.
        </Alert>
      </Snackbar>

      <SignIn
        open={signInOpen}
        handleClose={() => setSignInOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
