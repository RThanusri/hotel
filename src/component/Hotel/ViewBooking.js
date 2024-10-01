import React, { useState, useEffect } from "react"; // Ensure this is the correct import path
import { useNavigate } from "react-router-dom";
import "../Admin/Booking/Booking.css";
import axios from "axios"; // Import axios
import ViewBookingCard from "./ViewBookingCard";

const ViewBooking = () => {
    const nav = useNavigate();
    const [bookings, setBookings] = useState([]); // Initialize with an empty array

    const getBookings = () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        axios
            .get(`http://localhost:8080/api/api/shared/getBookingsByUserId/${userId}`, {
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
            <div className="booking-container">
                {bookings.length === 0 ? (
                    <div>
                        <h2>No bookings found.</h2>
                        <button onClick={() => nav("/AllHotels")}>Book Now</button>
                    </div>
                ) : (
                    bookings.map((booking) => (
                        <ViewBookingCard
                            key={booking.bookingId}
                            {...booking}
                            remove={() => cancelBooking(booking.bookingId)} // Pass the remove function
                            update={(id,updatedBooking) => updateBooking(booking.bookingId, updatedBooking)} // Pass the update function
                        />
                    ))
                )}
            </div>
        </>
    );
}

export default ViewBooking;
