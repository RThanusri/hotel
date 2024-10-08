import React, { useState, useEffect } from "react";
import HotelCard from "./HotelCard"; 
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { Alert, TextField, Button, Container, Box } from "@mui/material"; 
import "./Hotel.css";

const Hotel = () => {
  const nav = useNavigate();
  const [hotels, setHotels] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [alertMsg, setAlertMsg] = useState(''); 
  const [alertType, setAlertType] = useState(''); 
  const [showAlert, setShowAlert] = useState(false); 

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
        setHotels(response.data); 
      })
      .catch(() => {
        setAlertType('error');
        setAlertMsg('There was an error fetching the hotels!');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  const handleSearch = () => {
    const searchId = parseInt(searchTerm); 
    if (!isNaN(searchId)) {
      const filtered = hotels.filter((hotel) => hotel.id === searchId); 
      setFilteredHotels(filtered); 
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
      .then(() => {
        setAlertType('success');
        setAlertMsg('Hotel removed successfully');
        setShowAlert(true);
        getHotels(); 
      })
      .catch(() => {
        setAlertType('error');
        setAlertMsg('There was an error removing the hotel!');
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  const updateHotel = (id, updatedHotel) => {
    const token = localStorage.getItem("token");

    axios
      .put(`http://localhost:8080/api/owner/updateHotel/${id}`, updatedHotel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlertType('success');
        setAlertMsg('Hotel updated successfully');
        setShowAlert(true);
        getHotels(); 
      })
      .catch(() => {
        setAlertType('error');
        setAlertMsg('There was an error updating the hotel!');
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  useEffect(() => {
    getHotels(); 
  }, []);

  return (
    <Container>
      {showAlert && (
        <Box sx={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
          <Alert severity={alertType}>{alertMsg}</Alert>
        </Box>
      )}

      <Box 
        sx={{ 
          my: 4, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center" 
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search by ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          sx={{ mr: 2 }} 
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ backgroundColor: "#cc0000", color: "white", "&:hover": { backgroundColor: "#b30000" } }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={handleAddHotel}
          sx={{ backgroundColor: "#cc0000", color: "white", ml: 2, "&:hover": { backgroundColor: "#b30000" } }}
        >
          Add Hotel
        </Button>
      </Box>

      <div className="hotel-container">
        {(searchTerm ? filteredHotels : hotels).map((hotel) => (
          <HotelCard
            key={hotel.id}
            {...hotel}
            remove={() => removeHotel(hotel.id)} 
            update={(updatedHotel) => updateHotel(hotel.id, updatedHotel)} 
          />
        ))}
      </div>
    </Container>
  );
};

export default Hotel;
