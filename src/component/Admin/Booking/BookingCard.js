import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";

const BookingCard = ({
  bookingId,
  checkInDate,
  checkOutDate,
  numberOfAdults,
  numberOfChildren,
  numberOfRooms,
  guestAges,
  rooms,
  status,
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
  const [nStatus, setNStatus] = useState(status);

  const handleUpdate = () => {
    const updatedBooking = {
      checkInDate: nCheckInDate,
      checkOutDate: nCheckOutDate,
      numberOfAdults: nNumberOfAdults,
      numberOfChildren: nNumberOfChildren,
      numberOfRooms: nNumberOfRooms,
      guestAges: nGuestAges,
      status: nStatus,
    };

    update(bookingId, updatedBooking);
    setOpen(false);
  };

  const handleClose = () => {
    setNCheckInDate(checkInDate);
    setNCheckOutDate(checkOutDate);
    setNNumberOfAdults(numberOfAdults);
    setNNumberOfChildren(numberOfChildren);
    setNNumberOfRooms(numberOfRooms);
    setNGuestAges([...guestAges]);
    setNStatus(status);
    setOpen(false);
  };

  return (
    <div className="booking-card">
      <h3>Booking Id: {bookingId}</h3>
      <p>Check-in Date: {checkInDate}</p>
      <p>Check-out Date: {checkOutDate}</p>
      <p>Number of Adults: {numberOfAdults}</p>
      <p>Number of Children: {numberOfChildren}</p>
      <p>Number of Rooms: {numberOfRooms}</p>
      <p>Guest Ages: {guestAges.join(", ")}</p>
      <p>Status: {status}</p>

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
        <div>
          <label>Guest Ages: </label>
          <input
            type="text"
            value={nGuestAges.join(", ")}
            onChange={(e) =>
              setNGuestAges(e.target.value.split(",").map((age) => parseInt(age.trim())))
            }
          />
        </div>
        <div>
          <label>Status: </label>
          <input
            type="text"
            value={nStatus}
            onChange={(e) => setNStatus(e.target.value)}
          />
        </div>
        <button onClick={handleUpdate}>Confirm</button>
        <button onClick={handleClose}>Cancel</button>
      </Modal>
    </div>
  );
};

export default BookingCard;
