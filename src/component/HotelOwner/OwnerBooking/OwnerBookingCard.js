import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const BookingCardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  border: "1px solid #cc0000",
  borderRadius: "8px",
  padding: "16px",
  margin: "16px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "30%",
  
  height: "350px", 
}));

const Title = styled(Typography)({
  color: "#cc0000",
  marginBottom: "16px",
});

const OwnerBookingCard = ({
  bookingId,
  checkInDate,
  checkOutDate,
  numberOfAdults,
  numberOfChildren,
  numberOfRooms,
  guestAges = [],
  rooms = [], // Assuming `rooms` is an array of objects
  remove,
}) => {
  return (
    <BookingCardContainer>
      <Title variant="h6">Booking Id: {bookingId}</Title>
      <Typography>Check-in Date: {checkInDate}</Typography>
      <Typography>Check-out Date: {checkOutDate}</Typography>
      <Typography>Number of Adults: {numberOfAdults}</Typography>
      <Typography>Number of Children: {numberOfChildren}</Typography>
      <Typography>Number of Rooms: {numberOfRooms}</Typography>
      <Typography>Guest Ages: {guestAges.join(", ")}</Typography>
      <Typography>
        Room IDs: {rooms.map((room) => room.id).join(", ")}
      </Typography>
      <br />
      <Button
        variant="contained"
        color="error"
        onClick={() => remove(bookingId)}
      >
        Remove
      </Button>
    </BookingCardContainer>
  );
};

export default OwnerBookingCard;
