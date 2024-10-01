import React, { useState, useEffect } from "react";
import BookingCard from "./BookingCard"; // Ensure this is the correct import path
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import axios from "axios"; // Import axios

const Booking = () => {
  const nav = useNavigate();
  const [bookings, setBookings] = useState([]); // Initialize with an empty array
  const [searchTerm, setSearchTerm] = useState(0); // For search functionality
  const [filteredBookings, setFilteredBookings] = useState([]);

  const getBookings = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:8080/api/api/admin/getAllBookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the bookings!", error);
      });
  };

  const handleSearch = () => {
    const searchId = parseInt(searchTerm); // Convert search term to a number
    if (!isNaN(searchId)) {
      const filtered = bookings.filter((booking) => booking.bookingId === searchId);
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
  };

  const cancelBooking = (id) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:8080/api/api/shared/cancelBookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Booking cancelled successfully");
        getBookings(); // Refresh booking list after deletion
      })
      .catch((error) => {
        console.error("There was an error cancelling the booking!", error);
      });
  };

  const updateBooking = (id, updatedBooking) => {
    const token = localStorage.getItem("token");

    axios
      .put(`http://localhost:8080/api/api/user/updatebookings/${id}`, updatedBooking, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Booking updated successfully");
        getBookings(); // Refresh booking list after update
      })
      .catch((error) => {
        console.error("There was an error updating the booking!", error);
      });
  };

  useEffect(() => {
    getBookings(); // Fetch all bookings on component mount
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="Search by Booking ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />
      <button onClick={handleSearch}>Search</button>
      <div className="booking-container">
      {searchTerm
        ? filteredBookings.map((booking) => (
            <BookingCard
              key={booking.bookingId}
              {...booking}
              remove={() => cancelBooking(booking.bookingId)} // Pass the remove function
              update={(updatedBooking) => updateBooking(booking.bookingId, updatedBooking)} // Pass the update function
            />
          ))
        : bookings.map((booking) => (
            <BookingCard
              key={booking.bookingId}
              {...booking}
              remove={() => cancelBooking(booking.bookingId)} // Pass the remove function
              update={(updatedBooking) => updateBooking(booking.bookingId, updatedBooking)} // Pass the update function
            />
          ))}</div>
    </>
  );
};

export default Booking;

