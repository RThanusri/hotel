import React, { useEffect, useState } from "react";
import "./App.css";
import UserNavbar from "./component/User/UserNavBar";
import SRoutes from "./SRoutes";
import 'semantic-ui-css/semantic.min.css';
import SignIn from "./component/User/SignIn";
import Footer from "./component/Footer/Footer";
import { Snackbar, Alert } from '@mui/material';

import Home from "./component/Home/Home";
import OwnerHome from "./component/Home/OwnerHome";
import AdminHome from "./component/Home/AdminHome";

const SESSION_DURATION = 30 * 60 * 1000;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [userRole, setUserRole] = useState(null); // Track user role

  useEffect(() => {
    const checkSession = () => {
      const loginTime = localStorage.getItem("loginTime");
      const currentTime = Date.now();
      if (loginTime && (currentTime - loginTime > SESSION_DURATION)) {
        setIsLoggedIn(false);
        setSessionExpired(true);
        setSignInOpen(true); 
      } else {
        const role = localStorage.getItem("role");
        if (role) {
          setIsLoggedIn(true);
          setUserRole(role); // Get user role
          console.log('User role from localStorage:', role); // Debugging line
        }
      }
    };

    checkSession();

    const intervalId = setInterval(checkSession, 3000000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setSignInOpen(false);
    setSessionExpired(false);
    const role = localStorage.getItem("role");
    setUserRole(role); // Update user role
    localStorage.setItem("loginTime", Date.now());
    console.log('User logged in with role:', role); // Debugging line
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null); // Reset user role
    setSessionExpired(true);
  };

  const handleCloseSnackbar = () => {
    setSessionExpired(false);
  };

  return (
    <div className="app">
    {isLoggedIn && userRole === 'hotelowner' && <OwnerHome onLogout={handleLogout} />}
    {isLoggedIn && userRole === 'admin' && <AdminHome onLogout={handleLogout} />}
    {!isLoggedIn && <Home onLogout={handleLogout} />}
      
      <SRoutes />
      

      <Snackbar
        open={sessionExpired}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
