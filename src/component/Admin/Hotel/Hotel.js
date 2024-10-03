import React, { useState, useEffect } from "react";
import HotelCard from "./HotelCard"; // Ensure this is the correct import path
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { Alert } from "@mui/material"; // Import Alert from MUI
import "./Hotel.css";
import AdminNavBar from "../AdminNavBar/AdminNavBar";

const Hotel = () => {
  const nav = useNavigate();
  const [hotels, setHotels] = useState([]); // Initialize with an empty array
  const [searchTerm, setSearchTerm] = useState(0); // For search functionality
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [alertMsg, setAlertMsg] = useState(''); // Message for success/error alerts
  const [alertType, setAlertType] = useState(''); // Type for alert severity (success, error)
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alerts

  const handleAddHotel = () => {
    nav("/addHotel");
  };

  const getHotels = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/user/getAllHotels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHotels(response.data); // Set the hotels to the state
      })
      .catch((error) => {
        console.error("There was an error fetching the hotels!", error);
        setAlertType('error');
        setAlertMsg('There was an error fetching the hotels!');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  // Search hotels based on ID
  const handleSearch = () => {
    const searchId = parseInt(searchTerm); // Convert search term to number
    if (!isNaN(searchId)) {
      const filtered = hotels.filter((hotel) => hotel.id === searchId); // Filter hotels by ID
      setFilteredHotels(filtered); // Set filtered hotels
    } else {
      setFilteredHotels(hotels);
    }
  };

  const removeHotel = (id) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:8080/api/owner/removeHotel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setAlertType('success');
        setAlertMsg('Hotel removed successfully');
        setShowAlert(true);
        getHotels(); // Refresh hotel list after deletion
      })
      .catch((error) => {
        console.error("There was an error removing the hotel!", error);
        setAlertType('error');
        setAlertMsg('There was an error removing the hotel!');
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  const updateHotel = (id, updatedHotel) => {
    const token = localStorage.getItem("token");
    console.log(updatedHotel);
    
    axios
      .put(`http://localhost:8080/api/owner/updateHotel/${id}`, updatedHotel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAlertType('success');
        setAlertMsg('Hotel updated successfully');
        setShowAlert(true);
        getHotels(); 
      })
      .catch((error) => {
        console.error("There was an error updating the hotel!", error);
        setAlertType('error');
        setAlertMsg('There was an error updating the hotel!');
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  useEffect(() => {
    getHotels(); 
  }, []);

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

      <input
        type="text"
        placeholder="Search by ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleAddHotel}>Add Hotel</button>
      <div className="hotel-container">
        {searchTerm
          ? filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                {...hotel}
                remove={() => removeHotel(hotel.id)} // Pass the remove function with hotel ID
                update={(updatedHotel) => updateHotel(hotel.id, updatedHotel)} // Pass the update function with hotel ID
              />
            ))
          : hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                {...hotel}
                remove={() => removeHotel(hotel.id)} // Pass the remove function here
                update={(id,updatedHotel) =>
                  updateHotel(hotel.id, updatedHotel)
                } // Pass the update function here
              />
            ))}
      </div>
    </>
  );
};

export default Hotel;
