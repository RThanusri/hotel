import React, { useState } from "react";
import { Button, Modal, Box, TextField, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'white',
  border: '2px solid black',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px solid black',
};

const buttonStyle = {
  backgroundColor: '#cc0000',
  color: 'white',
  '&:hover': {
    backgroundColor: 'primary',
  },
};

const ViewBookingCard = ({
  bookingId,
  checkInDate,
  checkOutDate,
  numberOfAdults,
  numberOfChildren,
  numberOfRooms,
  guestAges = [],
  roomIds = [],
  update,
  remove
}) => {
  const [open, setOpen] = useState(false);
  const [nCheckInDate, setNCheckInDate] = useState(checkInDate);
  const [nCheckOutDate, setNCheckOutDate] = useState(checkOutDate);
  const [nNumberOfAdults, setNNumberOfAdults] = useState(numberOfAdults);
  const [nNumberOfChildren, setNNumberOfChildren] = useState(numberOfChildren);
  const [nGuestAges, setNGuestAges] = useState([...guestAges]);
  const [nRoomIds, setNRoomIds] = useState([...roomIds]);

  const handleUpdate = () => {
    const updatedData = {};
    if (nCheckInDate !== checkInDate) updatedData.checkInDate = nCheckInDate;
    if (nCheckOutDate !== checkOutDate) updatedData.checkOutDate = nCheckOutDate;
    if (nNumberOfAdults !== numberOfAdults) updatedData.numberOfAdults = nNumberOfAdults;
    if (nNumberOfChildren !== numberOfChildren) updatedData.numberOfChildren = nNumberOfChildren;
    if (JSON.stringify(nGuestAges) !== JSON.stringify(guestAges)) updatedData.guestAges = nGuestAges;
    if (JSON.stringify(nRoomIds) !== JSON.stringify(roomIds)) updatedData.roomIds = nRoomIds;

    if (Object.keys(updatedData).length > 0) {
      update(bookingId, updatedData);
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
    const updatedIds = [...nRoomIds];
    updatedIds[index] = value;
    setNRoomIds(updatedIds);
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Button variant="contained" sx={buttonStyle} onClick={() => setOpen(true)}>View Booking</Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" sx={buttonStyle} onClick={remove}>Remove Booking</Button>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>

      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography  variant="h6" component="h2">View Booking</Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant="body1">Check-in Date: {nCheckInDate}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Check-out Date: {nCheckOutDate}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Adults: {nNumberOfAdults}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Children: {nNumberOfChildren}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Guest Ages:</Typography>
              {nGuestAges.map((age, index) => (
                <TextField
                  key={index}
                  type="number"
                  value={age}
                  onChange={(e) => handleGuestAgeChange(index, e.target.value)}
                  placeholder="Guest Age"
                  fullWidth
                  margin="normal"
                />
              ))}
              <Button variant="contained" sx={{ ...buttonStyle, mt: 1 }} onClick={addGuestAge}>Add Guest Age</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Room IDs:</Typography>
              {nRoomIds.map((roomId, index) => (
                <TextField
                  key={index}
                  type="text"
                  value={roomId}
                  onChange={(e) => handleRoomIdChange(index, e.target.value)}
                  placeholder="Room ID"
                  fullWidth
                  margin="normal"
                />
              ))}
              <Button variant="contained" sx={{ ...buttonStyle, mt: 1 }} onClick={addRoomId}>Add Room ID</Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" sx={buttonStyle} onClick={handleUpdate}>Update</Button>
            <Button variant="outlined" sx={ buttonStyle} onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewBookingCard;
