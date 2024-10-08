import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { Alert, TextField, Button, Box, Container, Typography } from "@mui/material"; // Import necessary components from MUI
import './Room.css';
import OwnerNavBar from "./OwnerNavBar/OwnerNavBar";
import RoomCard from "../Admin/Room/RoomCard";


const OwnerRoom = () => {
  const { hotelId } = useParams();
  const nav = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState(0);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleAddRoom = () => {
    nav("/addRoom", { state: { hotelId } });
  };

  const getRooms = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:8080/api/shared/allRoomsInHotel/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the rooms!", error);
        setAlertType('error');
        setAlertMsg('There was an error fetching the rooms!');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  const handleSearch = () => {
    const searchId = parseInt(searchTerm);
    if (!isNaN(searchId)) {
      const filtered = rooms.filter((room) => room.id === searchId);
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(rooms);
    }
  };

  const removeRoom = (id) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:8080/api/owner/removeRoom/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlertType('success');
        setAlertMsg('Room removed successfully!');
        setShowAlert(true);
        getRooms();
      })
      .catch((error) => {
        console.error("There was an error removing the room!", error);
        setAlertType('error');
        setAlertMsg('There was an error removing the room!');
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  const updateRoom = (id, updatedData) => {
    const token = localStorage.getItem("token");

    axios
      .put(`http://localhost:8080/api/owner/updateRoom/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlertType('success');
        setAlertMsg('Room updated successfully!');
        setShowAlert(true);
        getRooms();
      })
      .catch((error) => {
        console.error("There was an error updating the Room!", error);
        setAlertType('error');
        setAlertMsg('There was an error updating the room!');
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <Container>
      <OwnerNavBar/>
      {showAlert && (
        <Box sx={{ position: "fixed", top: 20, right: 20, zIndex: 1000, width: "320px" }}>
          <Alert severity={alertType}>{alertMsg}</Alert>
        </Box>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search by ID"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, marginRight: 1 }}
        />
        <Button variant="contained" color="error" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="contained" color="error" onClick={handleAddRoom} sx={{ marginLeft: 1 }}>
          Add Room
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        Rooms in Hotel {hotelId}
      </Typography>

      <div className="room-container">
        {(searchTerm ? filteredRooms : rooms).map((room) => (
          <RoomCard
            key={room.id}
            {...room}
            remove={() => removeRoom(room.id)}
            update={(updatedRoom) => updateRoom(room.id, updatedRoom)}
          />
        ))}
      </div>
    </Container>
  );
};

export default OwnerRoom;
