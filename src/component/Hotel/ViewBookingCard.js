import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "white",
  border: "2px solid black",
  boxShadow: "none",
  p: 4,
  borderRadius: "8px",
};

const buttonStyle = {
  backgroundColor: "#cc0000",
  color: "white",
  "&:hover": {
    backgroundColor: "#0000FF",
  },
};

const ViewBookingCard = ({
  bookingId,
  checkInDate,
  checkOutDate,
  numberOfAdults,
  numberOfChildren,
  guestAges = [],
  roomIds = [],
  bookingStatus,
  update,
  remove,
  totalFare, // Accept totalFare as a prop
}) => {
  const [open, setOpen] = useState(false);
  const [nCheckInDate, setNCheckInDate] = useState(checkInDate);
  const [nCheckOutDate, setNCheckOutDate] = useState(checkOutDate);
  const [nNumberOfAdults, setNNumberOfAdults] = useState(numberOfAdults);
  const [nNumberOfChildren, setNNumberOfChildren] = useState(numberOfChildren);
  const [nGuestAges, setNGuestAges] = useState([...guestAges]);
  const [nRoomIds, setNRoomIds] = useState([...roomIds]);

  const extractedBookingId =
    typeof bookingId === "object"
      ? bookingId.id.toString()
      : bookingId.toString();

  const handleUpdate = () => {
    const updatedData = {};
    if (nCheckInDate !== checkInDate) updatedData.checkInDate = nCheckInDate;
    if (nCheckOutDate !== checkOutDate)
      updatedData.checkOutDate = nCheckOutDate;
    if (nNumberOfAdults !== numberOfAdults)
      updatedData.numberOfAdults = nNumberOfAdults;
    if (nNumberOfChildren !== numberOfChildren)
      updatedData.numberOfChildren = nNumberOfChildren;
    if (JSON.stringify(nGuestAges) !== JSON.stringify(guestAges))
      updatedData.guestAges = nGuestAges;
    if (JSON.stringify(nRoomIds) !== JSON.stringify(roomIds))
      updatedData.roomIds = nRoomIds;

    if (Object.keys(updatedData).length > 0) {
      update(extractedBookingId, updatedData);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setNCheckInDate(checkInDate);
    setNCheckOutDate(checkOutDate);
    setNNumberOfAdults(numberOfAdults);
    setNNumberOfChildren(numberOfChildren);
    setNGuestAges([...guestAges]);
    setNRoomIds([...roomIds]);
    setOpen(false);
  };

  const addGuestAge = () => setNGuestAges([...nGuestAges, ""]);
  const addRoomId = () => setNRoomIds([...nRoomIds, ""]);

  const handleGuestAgeChange = (index, value) => {
    const updatedAges = [...nGuestAges];
    updatedAges[index] = value;
    setNGuestAges(updatedAges);
  };

  const handleRoomIdChange = (index, value) => {
    const updatedRooms = [...nRoomIds];
    updatedRooms[index] = value;
    setNRoomIds(updatedRooms);
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ mb: 2, backgroundColor: "white" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={() => setOpen(true)}
                >
                  View Booking
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" sx={buttonStyle} onClick={remove}>
                  Cancel Booking
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            View Booking
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant="body1">Total Fare: ${totalFare}</Typography>
              <Typography variant="body1">
                Booking Status: {bookingStatus || "Pending"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Check-in Date: {nCheckInDate}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Check-out Date: {nCheckOutDate}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Adults: {nNumberOfAdults}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Children: {nNumberOfChildren}
              </Typography>
            </Grid>

            {/* Guest Age Input Fields */}
            {nGuestAges.map((age, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  label={`Guest Age ${index + 1}`}
                  value={age}
                  onChange={(e) => handleGuestAgeChange(index, e.target.value)}
                  fullWidth
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={buttonStyle}
                onClick={addGuestAge}
              >
                Add Guest Age
              </Button>
            </Grid>

            {/* Room ID Input Fields */}
            {nRoomIds.map((room, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  label={`Room ID ${index + 1}`}
                  value={room.roomId} // Assuming roomId is a property of each room object
                  onChange={(e) => handleRoomIdChange(index, e.target.value)} // Adjust if you need to store changes in a different way
                  fullWidth
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" sx={buttonStyle} onClick={addRoomId}>
                Add Room ID
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" sx={buttonStyle} onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="outlined" sx={buttonStyle} onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewBookingCard;
