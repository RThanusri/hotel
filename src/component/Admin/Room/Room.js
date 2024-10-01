import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RoomCard from "./RoomCard";
import axios from "axios";
import { Alert } from "@mui/material"; // Import Alert from MUI
import './Room.css';

const Room = () => {
  const { hotelId } = useParams();
  const nav = useNavigate();
  const [rooms, setRooms] = useState([]); // Initialize with empty array
  const [searchTerm, setSearchTerm] = useState(0); // For search functionality
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [alertMsg, setAlertMsg] = useState(''); // Message for success/error alerts
  const [alertType, setAlertType] = useState(''); // Type for alert severity (success, error)
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alerts

  const handleAddRoom = () => {
    nav("/addRoom");
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
        console.log(response);
        setRooms(response.data); // Set the hotels to the state
      })
      .catch((error) => {
        console.error("There was an error fetching the hotels!", error);
        setAlertType('error');
        setAlertMsg('There was an error fetching the rooms!');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
      });
  };

  // Search rooms based on ID
  const handleSearch = () => {
    const searchId = parseInt(searchTerm); // Convert search term to number
    if (!isNaN(searchId)) {
      const filtered = rooms.filter((room) => room.id === searchId); // Filter rooms by ID
      setFilteredRooms(filtered); // Set filtered rooms
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
      .then((response) => {
        console.log(response);
        setAlertType('success');
        setAlertMsg('Room removed successfully!');
        setShowAlert(true);
        getRooms(); // Refresh room list after deletion
      })
      .catch((error) => {
        console.error("There was an error removing the room!", error);
        setAlertType('error');
        setAlertMsg('There was an error removing the room!');
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
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
      .then((response) => {
        console.log(response);
        setAlertType('success');
        setAlertMsg('Room updated successfully!');
        setShowAlert(true);
        getRooms(); // Refresh room list after update
      })
      .catch((error) => {
        console.error("There was an error updating the Room!", error);
        setAlertType('error');
        setAlertMsg('There was an error updating the room!');
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
      });
  };

  // Fetch all rooms on component mount
  useEffect(() => {
    getRooms(); // Call the function to get all rooms
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
      <button onClick={handleAddRoom}>Add Room</button>
      <div className="room-container">
        {searchTerm
          ? filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                {...room}
                remove={() => removeRoom(room.id)} // Pass the remove function with room id
                update={(updatedRoom) => updateRoom(room.id, updatedRoom)} // Pass the update function with room id
              />
            ))
          : rooms.map((room) => (
              <RoomCard
                key={room.id}
                {...room}
                remove={() => removeRoom(room.id)} // Pass the remove function here
                update={(updatedRoom) => updateRoom(room.id, updatedRoom)} // Pass the update function here
              />
            ))}
      </div>
    </>
  );
};

export default Room;
