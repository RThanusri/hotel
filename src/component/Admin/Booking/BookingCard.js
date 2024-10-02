import React, { useState } from "react";
import { Button, Modal, TextField, Typography, Box } from "@mui/material";
import { Alert } from "@mui/material";
import { styled } from "@mui/system";

const BookingCardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid #cc0000',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width:'30%',
  height:'350px'
}));

const Title = styled(Typography)({
  color: '#cc0000',
  marginBottom: '16px',
});

const BookingCard = ({
  bookingId,
  checkInDate,
  checkOutDate,
  numberOfAdults,
  numberOfChildren,
  numberOfRooms,
  guestAges = [],
  roomIds = [],
  update,
  remove,
}) => {
  const [open, setOpen] = useState(false);
  const [nCheckInDate, setNCheckInDate] = useState(checkInDate);
  const [nCheckOutDate, setNCheckOutDate] = useState(checkOutDate);
  const [nNumberOfAdults, setNNumberOfAdults] = useState(numberOfAdults);
  const [nNumberOfChildren, setNNumberOfChildren] = useState(numberOfChildren);
  const [nNumberOfRooms, setNNumberOfRooms] = useState(numberOfRooms);
  const [nGuestAges, setNGuestAges] = useState([...guestAges]);
  const [nRoomIds, setNRoomIds] = useState([...roomIds]);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleUpdate = () => {
    const updatedData = {};

    if (nCheckInDate !== checkInDate) {
      updatedData.checkInDate = nCheckInDate;
    }
    if (nCheckOutDate !== checkOutDate) {
      updatedData.checkOutDate = nCheckOutDate;
    }
    if (nNumberOfAdults !== numberOfAdults) {
      updatedData.numberOfAdults = nNumberOfAdults;
    }
    if (nNumberOfChildren !== numberOfChildren) {
      updatedData.numberOfChildren = nNumberOfChildren;
    }
    if (nNumberOfRooms !== numberOfRooms) {
      updatedData.numberOfRooms = nNumberOfRooms;
    }
    if (JSON.stringify(nGuestAges) !== JSON.stringify(guestAges)) {
      updatedData.guestAges = nGuestAges;
    }
    if (JSON.stringify(nRoomIds) !== JSON.stringify(roomIds)) {
      updatedData.roomIds = nRoomIds;
    }

    if (Object.keys(updatedData).length > 0) {
      update(bookingId, updatedData);
      setAlertType('success');
      setAlertMsg('Booking updated successfully');
      setShowAlert(true);
      setOpen(false);
    } else {
      setAlertType('error');
      setAlertMsg('No changes made to the booking');
      setShowAlert(true);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleClose = () => {
    setNCheckInDate(checkInDate);
    setNCheckOutDate(checkOutDate);
    setNNumberOfAdults(numberOfAdults);
    setNNumberOfChildren(numberOfChildren);
    setNNumberOfRooms(numberOfRooms);
    setNGuestAges([...guestAges]);
    setNRoomIds([...roomIds]);
    setOpen(false);
  };

  const addGuestAge = () => {
    setNGuestAges([...nGuestAges, ""]);
  };

  const addRoomId = () => {
    setNRoomIds([...nRoomIds, ""]);
  };

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
    <BookingCardContainer>
      {showAlert && (
        <Alert severity={alertType} style={{ marginBottom: '16px' }}>
          {alertMsg}
        </Alert>
      )}

      <Title variant="h6">Booking Id: {bookingId}</Title>
      <Typography>Check-in Date: {checkInDate}</Typography>
      <Typography>Check-out Date: {checkOutDate}</Typography>
      <Typography>Number of Adults: {numberOfAdults}</Typography>
      <Typography>Number of Children: {numberOfChildren}</Typography>
      <Typography>Number of Rooms: {numberOfRooms}</Typography>
      <Typography>Guest Ages: {guestAges.join(", ")}</Typography>
      <Typography>Room IDs: {roomIds.join(", ")}</Typography><br/>

      <Button variant="contained" color="error" onClick={() => remove(bookingId)}>Remove</Button><br/><br/>
      <Button variant="contained" color="error" onClick={() => setOpen(true)}>Update</Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: '8px' }}>
          <Typography variant="h6">Update Booking</Typography>
          <TextField
            label="Check-in Date"
            type="date"
            value={nCheckInDate}
            onChange={(e) => setNCheckInDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Check-out Date"
            type="date"
            value={nCheckOutDate}
            onChange={(e) => setNCheckOutDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Number of Adults"
            type="number"
            value={nNumberOfAdults}
            onChange={(e) => setNNumberOfAdults(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Number of Children"
            type="number"
            value={nNumberOfChildren}
            onChange={(e) => setNNumberOfChildren(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Number of Rooms"
            type="number"
            value={nNumberOfRooms}
            onChange={(e) => setNNumberOfRooms(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Typography variant="body1">Guest Ages:</Typography>
          {nGuestAges.map((age, index) => (
            <TextField
              key={index}
              type="number"
              value={age}
              onChange={(e) => handleGuestAgeChange(index, e.target.value)}
              placeholder={`Guest Age ${index + 1}`}
              margin="normal"
              fullWidth
            />
          ))}
          <Button variant="contained" color="primary" onClick={addGuestAge}>Add Guest Age</Button>

          <Typography variant="body1">Room IDs:</Typography>
          {nRoomIds.map((id, index) => (
            <TextField
              key={index}
              value={id}
              onChange={(e) => handleRoomIdChange(index, e.target.value)}
              placeholder={`Room ID ${index + 1}`}
              margin="normal"
              fullWidth
            />
          ))}
          <Button variant="contained" color="primary" onClick={addRoomId}>Add Room ID</Button>

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="error" onClick={handleUpdate}>Confirm</Button>
            <Button variant="contained" color="error" onClick={handleClose} sx={{ ml: 2 }}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </BookingCardContainer>
  );
};

export default BookingCard;
