import React, { useState, useEffect } from "react";
import OwnerBookingCard from "./OwnerBookingCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, TextField, Button, Container, Box, Pagination } from "@mui/material";
import OwnerNavBar from "../OwnerNavBar/OwnerNavBar";

const OwnerBooking = () => {
  const nav = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  
  const itemsPerPage = 3; // Number of bookings per page
  const [currentPage, setCurrentPage] = useState(1);

  const getOwnerBookings = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    axios
      .get(`http://localhost:8080/api/api/owner/getBookingsForOwner/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
        headers: { Authorization: `Bearer ${token}` },
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
      setCurrentPage(1); // Reset to the first page on search
    } else {
      setFilteredBookings(bookings);
      setCurrentPage(1); // Reset to the first page on search
    }
  };

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getOwnerBookings();
  }, []);

  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  return (
    <>
      <OwnerNavBar />
      <Container>
        {showAlert && (
          <Box sx={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
            <Alert severity={alertType}>{alertMsg}</Alert>
          </Box>
        )}

        <Box
          sx={{
            my: -20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb:-10
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search by Booking ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mr: 2 ,mb:13}}
          />
          <Button
            variant="contained"
            color="error"
            onClick={handleSearch}
            sx={{ backgroundColor: "#cc0000" ,mb:13}}
          >
            Search
          </Button>
        </Box>

        <Box className="booking-container">
          {currentBookings.map((booking) => (
            <OwnerBookingCard
              key={booking.bookingId}
              {...booking}
              remove={() => cancelBooking(booking.bookingId)}
            />
          ))}
        </Box>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          color="error"
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        />
      </Container>
    </>
  );
};

export default OwnerBooking;
