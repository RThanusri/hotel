import React, { useEffect, useState } from "react";
import "./App.css";
import UserNavbar from "./component/User/UserNavBar";
import SRoutes from "./SRoutes";
import 'semantic-ui-css/semantic.min.css';
import SignIn from "./component/User/SignIn";
import Owner from "./component/HotelOwner/Owner";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setSignInOpen(true); // Open SignIn modal if no token
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setSignInOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      <UserNavbar onLogout={handleLogout} />
      <SRoutes />

      
      <SignIn
        open={signInOpen} 
        handleClose={() => setSignInOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />
    </div>
  );
}

export default App;
