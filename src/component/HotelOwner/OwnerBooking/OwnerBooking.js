import React, { useState, useEffect } from "react";
import OwnerBookingCard from "./OwnerBookingCard"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, TextField, Button, Container, Box } from "@mui/material"; 
import OwnerNavBar from "../OwnerNavBar/OwnerNavBar";

const OwnerBooking = () => {
  const nav = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const getOwnerBookings = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

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
        setBookings(response.data);
        setFilteredBookings(response.data);
      })
      .catch(() => {
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
        getOwnerBookings();
      })
      .catch(() => {
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
    const searchId = parseInt(searchTerm);
    if (!isNaN(searchId)) {
      const filtered = bookings.filter(
        (booking) => booking.bookingId === searchId
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
  };

  useEffect(() => {
    getOwnerBookings();
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
          placeholder="Search by Booking ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          color="error" 
          onClick={handleSearch}
          sx={{ backgroundColor: "#cc0000" }} 
        >
          Search
        </Button>
      </Box>

      <Box className="booking-container">
        {(searchTerm ? filteredBookings : bookings).map((booking) => (
          <OwnerBookingCard
            key={booking.bookingId}
            {...booking}
            remove={() => cancelBooking(booking.bookingId)}
          />
        ))}
      </Box>
    </Container>
    </>
  );
};

export default OwnerBooking;
