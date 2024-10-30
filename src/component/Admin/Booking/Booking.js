import React, { useState, useEffect } from "react";
import BookingCard from "./BookingCard"; // Ensure this is the correct import path
import { useNavigate } from "react-router-dom";
import { Alert, TextField, Button, Container, Box, Pagination } from "@mui/material"; // Import Material UI components
import axios from "axios";
import "./Booking.css";
import AdminNavBar from "../AdminNavBar/AdminNavBar";

const Booking = () => {
  const nav = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  
  // Pagination states
  const itemsPerPage = 3; // Number of bookings per page
  const [currentPage, setCurrentPage] = useState(1);

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
        setFilteredBookings(response.data);
      })
      .catch(() => {
        setAlertType("error");
        setAlertMsg("There was an error fetching the bookings!");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  const handleSearch = () => {
    const searchId = parseInt(searchTerm); // Convert search term to a number
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
      .catch(() => {
        setAlertType("error");
        setAlertMsg("There was an error cancelling the booking!");
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => setShowAlert(false), 3000);
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
      .catch(() => {
        setAlertType("error");
        setAlertMsg("There was an error updating the booking!");
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  useEffect(() => {
    getBookings(); // Fetch all bookings on component mount
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  // Determine which bookings to display on the current page
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  return (
    <>
      <Container>
        <AdminNavBar />
        {showAlert && (
          <Box sx={{ position: "fixed", top: 0, right: 20, zIndex: 1000 }}>
            <Alert severity={alertType}>{alertMsg}</Alert>
          </Box>
        )}

        <Box
          sx={{
          
            my: -20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb:3
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search by Booking ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mr: 2 }} // Margin right for spacing
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ backgroundColor: "#cc0000", color: "white", "&:hover": { backgroundColor: "#b30000" } }}
          >
            Search
          </Button>
        </Box>

        <div className="booking-container">
          {currentBookings.map((booking) => (
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

export default Booking;
