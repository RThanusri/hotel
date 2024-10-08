import React, { useState, useEffect } from "react";
import HotelCard from "../../Admin/Hotel/HotelCard"; 
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { Alert, TextField, Button, Container, Box } from "@mui/material"; 
import "../../Admin/Hotel/Hotel.css";
import OwnerNavBar from "../OwnerNavBar/OwnerNavBar";

const HotelByOwner = () => {
  const nav = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState(0);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleAddHotel = () => {
    nav("/addHotel");
  };

  const getHotels = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    axios
      .get(`http://localhost:8080/api/owner/getAllHotelsByOwner/${userId}`, {
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
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
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
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
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
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (<>
  <OwnerNavBar/>
    <Container>
      {showAlert && (
        <Box sx={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
          <Alert severity={alertType}>{alertMsg}</Alert>
        </Box>
      )}

      <Box  sx={{ 
          my: 4, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center" 
        }}>
        <TextField
          variant="outlined"
          placeholder="Search by ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          color="error"
          sx={{ backgroundColor: "#cc0000" }} 
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ml:2, backgroundColor: "#cc0000" }} 
          onClick={handleAddHotel}
        >
          Add Hotel
        </Button>
      </Box>

      <Box className="hotel-container">
        {(searchTerm ? filteredHotels : hotels).map((hotel) => (
          <HotelCard 
            key={hotel.id}
            {...hotel}
            remove={() => removeHotel(hotel.id)}
            update={(updatedHotel) => updateHotel(hotel.id, updatedHotel)}
          />
        ))}
      </Box>
    </Container>
    </>
  );
};

export default HotelByOwner;
