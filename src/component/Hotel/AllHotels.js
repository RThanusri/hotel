import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material"; // Import Alert from MUI

const AllHotels = () => {
  const navigate = useNavigate();
  
  // State for alerts
  const [alertMsg, setAlertMsg] = useState(''); // Message for success/error alerts
  const [alertType, setAlertType] = useState(''); // Type for alert severity (success, error)
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alerts

  useEffect(() => {
    const fetchAllHotels = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:8080/api/user/getAllHotels', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        navigate('/explorehotelListings', { 
          state: {
            hotels: response.data,
          }
        });
        
        // Show success alert
        setAlertType('success');
        setAlertMsg('Hotels fetched successfully!');
        setShowAlert(true);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setAlertType('error');
        setAlertMsg('Error fetching hotels. Please try again later.');
        setShowAlert(true);
      } finally {
        // Hide alert after 3 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }
    };

    fetchAllHotels();
  }, [navigate]); 

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

    </>
  ); 
};

export default AllHotels;
