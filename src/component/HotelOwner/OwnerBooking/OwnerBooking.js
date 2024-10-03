import React, { useState, useEffect } from "react";
import OwnerBookingCard from "./OwnerBookingCard"; // Ensure this is the correct import path
import { useNavigate } from "react-router-dom";
import "../../Admin/Booking/Booking.css";
import axios from "axios";
import { Alert } from "@mui/material"; // Import Alert from MUI

const OwnerBooking = () => {
  const nav = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [alertMsg, setAlertMsg] = useState(""); // Message for success/error alerts
  const [alertType, setAlertType] = useState(""); // Type for alert severity (success, error)
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alerts

  const getOwnerBookings = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Get owner ID from localStorage

    axios
      .get(
        `http://localhost:8080/api/api/owner/getBookingsForOwner/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setBookings(response.data);
        setFilteredBookings(response.data); // Set both filtered and unfiltered bookings
      })
      .catch((error) => {
        setAlertType("error");
        setAlertMsg("There was an error fetching the bookings!");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
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
        setAlertType("success");
        setAlertMsg("Booking cancelled successfully");
        setShowAlert(true);
        getOwnerBookings(); // Refresh booking list after cancellation
      })
      .catch((error) => {
        setAlertType("error");
        setAlertMsg("There was an error cancelling the booking!");
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  const handleSearch = () => {
    const searchId = parseInt(searchTerm); // Convert search term to a number
    if (!isNaN(searchId)) {
      const filtered = bookings.filter(
        (booking) => booking.bookingId === searchId
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings); // If search term is invalid, show all bookings
    }
  };

  useEffect(() => {
    getOwnerBookings(); // Fetch all bookings for the owner on component mount
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
        placeholder="Search by Booking ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />
      <button onClick={handleSearch}>Search</button>

      <div className="booking-container">
        {searchTerm
          ? filteredBookings.map((booking) => (
              <OwnerBookingCard
                key={booking.bookingId}
                {...booking}
                remove={() => cancelBooking(booking.bookingId)}
              />
            ))
          : bookings
          ? bookings.map((booking) => (
              <OwnerBookingCard
                key={booking.bookingId}
                {...booking}
                remove={() => cancelBooking(booking.bookingId)}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default OwnerBooking;
