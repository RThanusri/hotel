import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const AddBooking = () => {
  
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [guestAges, setGuestAges] = useState([]);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState(new Set());
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [bookingInfo, setBookingInfo] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
    console.log("Hotel ID:", hotelId); // Check if hotelId is defined
  }, [hotelId]);
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      fetchAvailableRooms();
    }
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    const totalGuests = numberOfAdults + numberOfChildren;
    setGuestAges(Array(totalGuests).fill(""));
  }, [numberOfAdults, numberOfChildren]);

  const fetchAvailableRooms = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8080/api/shared/getAvailableRooms", {
        params: { checkInDate, checkOutDate, numberOfAdults, numberOfChildren, hotelId: 1 },
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvailableRooms(response.data);
    } catch (error) {
      console.error("Error fetching available rooms:", error);
      setSnackbarMessage("Error fetching available rooms.");
      setSnackbarOpen(true);
    }
  };

  const addBooking = async () => {
    if (selectedRooms.size !== numberOfRooms) {
      setSnackbarMessage(`Please select exactly ${numberOfRooms} room(s).`);
      setSnackbarOpen(true);
      return;
    }

    const userId = localStorage.getItem("userId");
    const booking = {
      userId,
      checkInDate,
      checkOutDate,
      numberOfAdults,
      numberOfChildren,
      guestAges,
      numberOfRooms,
      roomIds: Array.from(selectedRooms),
    };
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/api/user/makeBooking",
        booking,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { bookingId, totalFare, bookingStatus } = response.data;
      setBookingInfo({ bookingId, totalFare, bookingStatus });
      setModalMessage("Booking added successfully!");
    } catch (error) {
      console.error("Error adding booking:", error);
      setModalMessage("There was an error in adding the booking!");
    } finally {
      setOpenModal(true);
    }
  };

  const handleGuestAgeChange = (index, value) => {
    const newGuestAges = [...guestAges];
    newGuestAges[index] = value;
    setGuestAges(newGuestAges);
  };

  const handleRoomSelect = (roomId) => {
    const updatedSelection = new Set(selectedRooms);
    if (updatedSelection.has(roomId)) {
      updatedSelection.delete(roomId);
    } else {
      updatedSelection.add(roomId);
    }
    setSelectedRooms(updatedSelection);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const updateGuestCounts = (adults, children) => {
    const validAdults = Math.max(parseInt(adults) || 1, 1);
    const validChildren = Math.max(parseInt(children) || 0, 0);
    setNumberOfAdults(validAdults);
    setNumberOfChildren(validChildren);
  };
 
  return (
    <Container maxWidth="md">
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        
      </Box>
          <Typography variant="h6" component="h2">
            {modalMessage}
          </Typography>
          {modalMessage === "Booking added successfully!" && (
            <Box mt={2}>
              <Typography variant="body1">
                Booking ID: {bookingInfo.bookingId}
              </Typography>
              <Typography variant="body1">
                Total Fare: ₹{bookingInfo.totalFare.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Booking Status: {bookingInfo.bookingStatus}
              </Typography>
            </Box>
          )}
          <Button
            onClick={handleCloseModal}
            color="primary"
            variant="contained"
            style={{ marginTop: "20px" }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Paper
        elevation={3}
        style={{
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
       
        <Typography
          variant="h4"
          align="center"
          style={{
            fontWeight: "bold",
            color: "#cc0000",
          }}
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
                onChange={(e) =>
                  updateGuestCounts(e.target.value, numberOfChildren)
                }
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
                onChange={(e) =>
                  updateGuestCounts(numberOfAdults, e.target.value)
                }
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Number of Rooms"
                type="number"
                value={numberOfRooms}
                onChange={(e) => setNumberOfRooms(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Select Rooms:</Typography>
              {availableRooms.length > 0 ? (
                availableRooms.map((room) => (
                  <div key={room.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedRooms.has(room.id)}
                          onChange={() => handleRoomSelect(room.id)}
                          sx={{
                            '&.Mui-checked': {
                              color: '#cc0000', // Red color for checked state
                            },
                          }}
                        />
                      }
                      label={`${room.roomSize} - ${room.bedSize} (Max Occupancy: ${room.maxOccupancy})`}
                    />
                  </div>
                ))
              ) : (
                <Typography>No rooms available for the selected dates.</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#cc0000", color: "#fff" }}
                onClick={addBooking}
                fullWidth
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
