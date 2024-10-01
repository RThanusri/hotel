import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ViewBookingCard from "./ViewBookingCard";
import {
    Container,
    Typography,
    Button,
    Grid,
    Paper,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";

const ViewBooking = () => {
    const nav = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const getBookings = () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        setLoading(true);
        axios
            .get(`http://localhost:8080/api/api/shared/getBookingsByUserId/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setBookings(response.data);
                setError("");
            })
            .catch((error) => {
                setError("Error fetching bookings. Please try again later.");
                console.error("There was an error fetching the bookings!", error);
            })
            .finally(() => {
                setLoading(false);
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
                setSnackbarMessage("Booking cancelled successfully");
                setSnackbarOpen(true);
                getBookings();
            })
            .catch((error) => {
                setSnackbarMessage("Error cancelling booking. Please try again.");
                setSnackbarOpen(true);
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
                setSnackbarMessage("Booking updated successfully");
                setSnackbarOpen(true);
                getBookings();
            })
            .catch((error) => {
                setSnackbarMessage("Error updating booking. Please try again.");
                setSnackbarOpen(true);
                console.error("There was an error updating the booking!", error);
            });
    };

    useEffect(() => {
        getBookings();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="md" style={{ backgroundColor: '#F0F8FF', padding: '20px', borderRadius: '8px solid black' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ color: 'black',fontWeight:'bolder' }}>
                My Bookings ({bookings.length})
            </Typography>
            {loading ? (
                <CircularProgress style={{ display: 'block', margin: 'auto', color: '#cc0000' }} />
            ) : error ? (
                <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#cc0000', color: '#fff' }}>
                    <Typography variant="h5">{error}</Typography>
                    <Button 
                        variant="contained" 
                        style={{ marginTop: '20px', backgroundColor: '#cc0000', color: '#fff' }}
                        onClick={getBookings}
                    >
                        Retry
                    </Button>
                </Paper>
            ) : bookings.length === 0 ? (
                <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#cc0000', color: '#fff' }}>
                    <Typography variant="h5">No bookings found.</Typography>
                    <Button 
                        variant="contained" 
                        onClick={() => nav("/AllHotels")}
                        style={{ marginTop: '20px', backgroundColor: '#cc0000', color: '#fff' }}
                    >
                        Book Now
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={2}>
                    {bookings.map((booking) => (
                        <Grid item xs={12} key={booking.bookingId}>
                            <ViewBookingCard
                                bookingId={booking.bookingId}
                                checkInDate={booking.checkInDate}
                                checkOutDate={booking.checkOutDate}
                                numberOfAdults={booking.numberOfAdults}
                                numberOfChildren={booking.numberOfChildren}
                                guestAges={booking.guestAges}
                                remove={() => cancelBooking(booking.bookingId)}
                                update={(updatedBooking) => updateBooking(booking.bookingId, updatedBooking)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ViewBooking;
