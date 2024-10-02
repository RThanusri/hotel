import React, { useState, useEffect } from "react";
import BookingCard from "./BookingCard"; // Ensure this is the correct import path
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import axios from "axios";
import { Alert } from "@mui/material"; // Import Alert from MUI

const Booking = () => {
  const nav = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState(0);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [alertMsg, setAlertMsg] = useState(""); // Message for success/error alerts
  const [alertType, setAlertType] = useState(""); // Type for alert severity (success, error)

  const [showAlert, setShowAlert] = useState(false); // State to show/hide alerts

  const getBookings = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:8080/api/api/admin/getAllBookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setBookings(response.data);
      })
      .catch((error) => {
        setAlertType("error");
        setAlertMsg("There was an error fetching the bookings!");
        setShowAlert(true);
        // Hide alert after 3 seconds
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
        setAlertType("success");
        setAlertMsg("Booking cancelled successfully");
        setShowAlert(true);
        getBookings(); // Refresh booking list after deletion
      })
      .catch((error) => {
        setAlertType("error");
        setAlertMsg("There was an error cancelling the booking!");
        setShowAlert(true);
      })
      .finally(() => {
        // Hide alert after 3 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  const updateBooking = (id, updatedBooking) => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `http://localhost:8080/api/api/user/updatebookings/${id}`,
        updatedBooking,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAlertType("success");
        setAlertMsg("Booking updated successfully");
        setShowAlert(true);
        getBookings(); // Refresh booking list after update
      })
      .catch((error) => {
        setAlertType("error");
        setAlertMsg("There was an error updating the booking!");
        setShowAlert(true);
      })
      .finally(() => {
        // Hide alert after 3 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  useEffect(() => {
    getBookings(); // Fetch all bookings on component mount
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
              <BookingCard
                key={booking.bookingId}
                {...booking}
                remove={() => cancelBooking(booking.bookingId)} // Pass the remove function
                update={(updatedBooking) =>
                  updateBooking(booking.bookingId, updatedBooking)
                } // Pass the update function
              />
            ))
          : bookings.map((booking) => (
              <BookingCard
                key={booking.bookingId}
                {...booking}
                remove={() => cancelBooking(booking.bookingId)} // Pass the remove function
                update={(updatedBooking) =>
                  updateBooking(booking.bookingId, updatedBooking)
                } // Pass the update function
              />
            ))}
      </div>
    </>
  );
};

export default Booking;
