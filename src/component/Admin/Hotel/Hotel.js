import React, { useState, useEffect } from "react";
import HotelCard from "./HotelCard"; // Ensure this is the correct import path
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./Hotel.css";
import AdminNavBar from "../AdminNavBar/AdminNavBar";

const Hotel = () => {
  const nav = useNavigate();
  const [hotels, setHotels] = useState([]); // Initialize with empty array
  const [searchTerm, setSearchTerm] = useState(0); // For search functionality
  const [filteredHotels, setFilteredHotels] = useState([]);
  const handleAddHotel = () => {
    nav("/addHotel");
  };

  const getHotels = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8081/api/user/getAllHotels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHotels(response.data); // Set the hotels to the state
      })
      .catch((error) => {
        console.error("There was an error fetching the hotels!", error);
      });
  };

  // Search hotels based on name
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
    console.log(id);
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:8081/api/owner/removeHotel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        alert("Hotel removed successfully");
        getHotels(); // Refresh hotel list after deletion
      })
      .catch((error) => {
        console.error("There was an error removing the hotel!", error);
      });
  };

  const updateHotel = (id, updatedHotel) => {
    const token = localStorage.getItem("token");
    console.log(updatedHotel);
    axios
      .put(`http://localhost:8081/api/owner/updateHotel/${id}`, updatedHotel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
      
        alert("Hotel updated successfully");
        getHotels(); // Refresh hotel list after update
      })
      .catch((error) => {
        console.error("There was an error updating the hotel!", error);
      });
  };

  // Fetch all hotels on component mount
  useEffect(() => {
    getHotels(); // Call the function to get all hotels
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
      <button onClick={handleAddHotel}>Add Hotel</button>
      <div className="hotel-container">
        {searchTerm
          ? filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                {...hotel}
                remove={() => removeHotel(hotel.id)} // Pass the remove function with hotel id
                update={(updatedHotel) => updateHotel(hotel.id, updatedHotel)} // Pass the update function with hotel id
              />
            ))
          : hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                {...hotel}
                remove={() => removeHotel(hotel.id)} // Pass the remove function here
                update={(id, updatedHotel) =>
                  updateHotel(hotel.id, updatedHotel)
                } // Pass the update function here
              />
            ))}
      </div>
    </>
  );
};

export default Hotel;
