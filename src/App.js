import React, { useEffect, useState } from "react";
import "./App.css";
import UserNavbar from "./component/User/UserNavBar";
import SRoutes from "./SRoutes";
import 'semantic-ui-css/semantic.min.css';
import SignIn from "./component/User/SignIn";
import Footer from "./component/Footer/Footer";
import { Snackbar, Alert, Button } from '@mui/material';
import Home from "./component/Home/Home";
import OwnerHome from "./component/Home/OwnerHome";
import AdminHome from "./component/Home/AdminHome";
import OwnerNavBar from "./component/HotelOwner/OwnerNavBar/OwnerNavBar";
import AdminNavBar from "./component/Admin/AdminNavBar/AdminNavBar";

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem("token");
      const loginTime = localStorage.getItem("loginTime");
      const currentTime = Date.now();

      if (!token) {
        setIsLoggedIn(false);
        setSignInOpen(true); // Show login modal if no token
        return;
      }

      if (loginTime && (currentTime - loginTime > SESSION_DURATION)) {
        handleLogout(); // Log out user if session has expired
      } else {
        const role = localStorage.getItem("role");
        if (role) {
          setIsLoggedIn(true);
          setUserRole(role);
          console.log('User role from localStorage:', role);
        }
      }
    };

    checkSession(); // Initial check

    const intervalId = setInterval(checkSession, 1000); // Check every second
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setSignInOpen(false);
    setSessionExpired(false);
    const role = localStorage.getItem("role");
    setUserRole(role);
    localStorage.setItem("loginTime", Date.now());

    // Set a timeout to remove the token after 30 minutes
    setTimeout(() => {
      handleLogout();
    }, SESSION_DURATION);

    console.log('User logged in with role:', role);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null);
    setSessionExpired(true);
  };

  const handleCloseSnackbar = () => {
    setSessionExpired(false);
  };

  return (
    <div className="app">
      {!isLoggedIn && <UserNavbar onLogout={handleLogout} userRole={userRole} />}
      
      {isLoggedIn && userRole === 'HOTEL_OWNER' && <OwnerNavBar onLogout={handleLogout} />}
      {isLoggedIn && userRole === 'ADMIN' && <AdminNavBar onLogout={handleLogout} />}
      {isLoggedIn && userRole === 'USER' && <UserNavbar onLogout={handleLogout} />}
      
      <div className="main-content">
        {!isLoggedIn && <Home />}
        <SRoutes />
      </div>
  
      <Snackbar
        open={sessionExpired}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          action={
            <Button color="inherit" onClick={() => setSignInOpen(true)}>
              Login
            </Button>
          }
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
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
