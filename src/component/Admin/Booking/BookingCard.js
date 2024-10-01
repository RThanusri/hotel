import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Alert } from "@mui/material"; // Import Alert from MUI
import './BookingCard.css';

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
  const [alertMsg, setAlertMsg] = useState(''); // Message for alerts
  const [alertType, setAlertType] = useState(''); // Type for alert severity
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alerts

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

    // Only update if there are changes
    if (Object.keys(updatedData).length > 0) {
      update(bookingId, updatedData);
      setAlertType('success');
      setAlertMsg('Booking updated successfully');
      setShowAlert(true);
      setOpen(false); // Close the modal
    } else {
      setAlertType('error');
      setAlertMsg('No changes made to the booking');
      setShowAlert(true);
    }

    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleClose = () => {
    // Reset fields to original values
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
    setNGuestAges([...nGuestAges, ""]); // Add an empty string for a new input
  };

  const addRoomId = () => {
    setNRoomIds([...nRoomIds, ""]); // Add an empty string for a new input
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
    <div className="booking-card">
      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
            width: "320px",
          }}
        >
          <Alert severity={alertType}>{alertMsg}</Alert>
        </div>
      )}

      <h3>Booking Id: {bookingId}</h3>
      <p>Check-in Date: {checkInDate}</p>
      <p>Check-out Date: {checkOutDate}</p>
      <p>Number of Adults: {numberOfAdults}</p>
      <p>Number of Children: {numberOfChildren}</p>
      <p>Number of Rooms: {numberOfRooms}</p>
      <p>Guest Ages: {guestAges.join(", ")}</p>
      <p>Room IDs: {roomIds.join(", ")}</p>

      <Button onClick={() => remove(bookingId)}>Remove</Button>
      <Modal
        onClose={handleClose}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Update</Button>}
      >
        <div>
          <label>Check-in Date: </label>
          <input
            type="date"
            value={nCheckInDate}
            onChange={(e) => setNCheckInDate(e.target.value)}
          />
        </div>
        <div>
          <label>Check-out Date: </label>
          <input
            type="date"
            value={nCheckOutDate}
            onChange={(e) => setNCheckOutDate(e.target.value)}
          />
        </div>
        <div>
          <label>Number of Adults: </label>
          <input
            type="number"
            value={nNumberOfAdults}
            onChange={(e) => setNNumberOfAdults(e.target.value)}
          />
        </div>
        <div>
          <label>Number of Children: </label>
          <input
            type="number"
            value={nNumberOfChildren}
            onChange={(e) => setNNumberOfChildren(e.target.value)}
          />
        </div>
        <div>
          <label>Number of Rooms: </label>
          <input
            type="number"
            value={nNumberOfRooms}
            onChange={(e) => setNNumberOfRooms(e.target.value)}
          />
        </div>

        {/* Guest Ages Input Fields */}
        <div>
          <label>Guest Ages: </label>
          {nGuestAges.map((age, index) => (
            <input
              key={index}
              type="number"
              value={age}
              onChange={(e) => handleGuestAgeChange(index, e.target.value)}
              placeholder={`Guest Age ${index + 1}`}
            />
          ))}
          <Button onClick={addGuestAge}>Add Guest Age</Button>
        </div>

        {/* Room IDs Input Fields */}
        <div>
          <label>Room IDs: </label>
          {nRoomIds.map((id, index) => (
            <input
              key={index}
              type="text"
              value={id}
              onChange={(e) => handleRoomIdChange(index, e.target.value)}
              placeholder={`Room ID ${index + 1}`}
            />
          ))}
          <Button onClick={addRoomId}>Add Room ID</Button>
        </div>

        <button onClick={handleUpdate}>Confirm</button>
        <button onClick={handleClose}>Cancel</button>
      </Modal>
    </div>
  );
};

export default BookingCard;
