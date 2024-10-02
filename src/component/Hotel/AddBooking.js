import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  Modal,
} from "@mui/material";

const AddBooking = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [guestAges, setGuestAges] = useState([""]);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [roomIds, setRoomIds] = useState([""]);

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [bookingInfo, setBookingInfo] = useState({});

  const addBooking = () => {
    const userId = localStorage.getItem("userId");
    const booking = {
      userId,
      checkInDate,
      checkOutDate,
      numberOfAdults,
      numberOfChildren,
      guestAges,
      numberOfRooms,
      roomIds,
    };
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:8080/api/api/user/makeBooking", booking, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { bookingId, totalFare, bookingStatus } = response.data;
        console.log(response.data)

        // Store booking info in local storage using a unique key
        localStorage.setItem(`booking_${bookingId}`, JSON.stringify({ totalFare, bookingStatus }));

        setBookingInfo({
          bookingId,
          totalFare,
          bookingStatus,
        });

        setModalMessage("Booking added successfully!");
      })
      .catch((error) => {
        setModalMessage("There was an error in adding the booking!");
      })
      .finally(() => {
        setOpenModal(true);
      });
  };

  const handleGuestAgeChange = (index, value) => {
    const newGuestAges = [...guestAges];
    newGuestAges[index] = value;
    setGuestAges(newGuestAges);
  };

  const handleRoomIdChange = (index, value) => {
    const newRoomIds = [...roomIds];
    newRoomIds[index] = value;
    setRoomIds(newRoomIds);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="md">
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            {modalMessage}
          </Typography>
          {modalMessage === "Booking added successfully!" && (
            <Box mt={2}>
              <Typography variant="body1">Booking ID: {bookingInfo.bookingId}</Typography>
              <Typography variant="body1">Total Fare: ₹{bookingInfo.totalFare.toFixed(2)}</Typography>
              <Typography variant="body1">Booking Status: {bookingInfo.bookingStatus}</Typography>
            </Box>
          )}
          <Button onClick={handleCloseModal} color="primary" variant="contained" style={{ marginTop: '20px' }}>
            Close
          </Button>
        </Box>
      </Modal>

      <Paper elevation={3} style={{ padding: "20px", backgroundColor: "#fff", border: '2px solid black' }}>
        <Typography
          variant="h4"
          align="center"
          style={{
            fontWeight: 'bold',
            color: "#cc0000",
            fontFamily: "Arial, sans-serif",
            transition: "color 0.3s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#990000")}
          onMouseLeave={(e) => (e.target.style.color = "#cc0000")}
        >
          Reserve Your Stay
        </Typography>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Check-In Date"
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Check-Out Date"
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Number of Adults"
                type="number"
                value={numberOfAdults}
                onChange={(e) => setNumberOfAdults(e.target.value)}
                min="1"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Number of Children"
                type="number"
                value={numberOfChildren}
                onChange={(e) => setNumberOfChildren(e.target.value)}
                min="0"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Guest Ages:</Typography>
              {guestAges.map((age, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={`Age of Guest ${index + 1}`}
                  type="number"
                  value={age}
                  onChange={(e) => handleGuestAgeChange(index, e.target.value)}
                  placeholder="Enter guest age"
                  style={{ marginBottom: "10px" }}
                />
              ))}
              <Button
                variant="contained"
                style={{ backgroundColor: "#cc0000", color: "#fff" }}
                onClick={() => setGuestAges([...guestAges, ""])}
              >
                Add Guest Age
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Number of Rooms"
                type="number"
                value={numberOfRooms}
                onChange={(e) => setNumberOfRooms(e.target.value)}
                min="1"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Room IDs:</Typography>
              {roomIds.map((roomId, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={`Room ID ${index + 1}`}
                  type="text"
                  value={roomId}
                  onChange={(e) => handleRoomIdChange(index, e.target.value)}
                  placeholder="Enter room ID"
                  style={{ marginBottom: "10px" }}
                />
              ))}
              <Button
                variant="contained"
                style={{ backgroundColor: "#cc0000", color: "#fff" }}
                onClick={() => setRoomIds([...roomIds, ""])}
              >
                Add Room ID
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#cc0000", color: "#fff", width: "100%" }}
                onClick={addBooking}
              >
                Add Booking
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddBooking;
