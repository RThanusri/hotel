import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RoomCard from "./RoomCard";
import axios from "axios";
import './Room.css'

const Room = () => {
  const { hotelId } = useParams();
  const nav = useNavigate();
  const [rooms, setRooms] = useState([]); // Initialize with empty array
  const [searchTerm, setSearchTerm] = useState(0); // For search functionality
  const [filteredRooms, setFilteredRooms] = useState([]);
  const handleAddRoom = () => {
    nav("/addRoom");
  };

  const getRooms = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:8081/api/shared/allRoomsInHotel/${hotelId}`, {
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
      });
  };

  // Search hotels based on name
  const handleSearch = () => {
    const searchId = parseInt(searchTerm); // Convert search term to number
    if (!isNaN(searchId)) {
      const filtered = rooms.filter((room) => room.id === searchId); // Filter hotels by ID
      setFilteredRooms(filtered); // Set filtered hotels
    } else {
      setFilteredRooms(rooms);
    }
  };

  const removeRoom = (id) => {
    console.log(id);
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:8081/api/owner/removeRoom/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        alert("room removed successfully");
        getRooms(); // Refresh hotel list after deletion
      })
      .catch((error) => {
        console.error("There was an error removing the room!", error);
      });
  };

  const updateRoom = (id, updatedData) => {
    const token = localStorage.getItem("token");
    console.log("id :" + id);
    console.log("inside update room in room.js" + updatedData);
    axios
      .put(`http://localhost:8081/api/owner/updateRoom/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        alert("Room updated successfully");
        getRooms(); // Refresh hotel list after update
      })
      .catch((error) => {
        console.error("There was an error updating the Room!", error);
      });
  };

  // Fetch all rooms on component mount
  useEffect(() => {
    getRooms(); // Call the function to get all rooms
  }, []);

  return (
    <>
      {/* <AdminNavBar/> */}
      <input
        type="text"
        placeholder="Search by id"
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
              remove={() => removeRoom(room.id)} // Pass the remove function with hotel id
              update={(updatedRoom) => updateRoom(room.id, updatedRoom)} // Pass the update function with hotel id
            />
          ))
        : rooms.map((room) => (
            <RoomCard
              key={room.id}
              {...room}
              remove={() => removeRoom(room.id)} // Pass the remove function here
              update={(id, updatedData) => updateRoom(room.id, updatedData)} // Pass the update function here
            />
          ))}</div>
    </>
  );
};

export default Room;
