import React, { useEffect, useState } from "react";
import "./App.css";
import UserNavbar from "./component/User/UserNavBar";
import SRoutes from "./SRoutes";
import 'semantic-ui-css/semantic.min.css';
import SignIn from "./component/User/SignIn";
import SignUp from "./component/User/SignUp"; // Import SignUp component
import Footer from "./component/Footer/Footer";
import { Snackbar, Alert, Button } from '@mui/material';
import Home from "./component/Home/Home";
import OwnerNavBar from "./component/HotelOwner/OwnerNavBar/OwnerNavBar";
import AdminNavBar from "./component/Admin/AdminNavBar/AdminNavBar";

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false); // State for SignUp modal
  const [sessionExpired, setSessionExpired] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem("token");
      const loginTime = localStorage.getItem("loginTime");
      const currentTime = Date.now();

      if (!token) {
        setIsLoggedIn(false);
        setSignInOpen(true);
        return;
      }

      if (loginTime && (currentTime - loginTime > SESSION_DURATION)) {
        handleLogout();
      } else {
        const role = localStorage.getItem("role");
        if (role) {
          setIsLoggedIn(true);
          setUserRole(role);
        }
      }
    };

    checkSession();
    const intervalId = setInterval(checkSession, 240000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setSignInOpen(false);
    setSessionExpired(false);
    const role = localStorage.getItem("role");
    setUserRole(role);
    localStorage.setItem("loginTime", Date.now());

    setTimeout(() => {
      handleLogout();
    }, SESSION_DURATION);
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
        <Alert action={<Button color="inherit" onClick={() => setSignInOpen(true)}>Login</Button>} onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Session Expired! Please log in again to continue.
        </Alert>
      </Snackbar>

      <SignIn
        open={signInOpen}
        handleClose={() => setSignInOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        openSignUp={() => setSignUpOpen(true)} // Pass openSignUp function here
      />
      
      <SignUp
        open={signUpOpen}
        handleClose={() => setSignUpOpen(false)}
        handleOpenSignIn={() => setSignInOpen(true)} // Open SignIn from SignUp
      />
    </div>
  );
}

export default App;
