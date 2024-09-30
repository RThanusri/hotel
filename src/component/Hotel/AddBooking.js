import React, { useState } from "react";
import axios from "axios";

const AddBooking = () => {
  // State for booking details
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [guestAges, setGuestAges] = useState([""]); // Initially an array with one empty string for age input
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [roomIds, setRoomIds] = useState([""]); // Initially an array with one empty string for room ID input

  const addBooking = () => {
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
    console.log("inside add booking");
    const booking = {
      userId: userId,
      checkInDate,
      checkOutDate,
      numberOfAdults,
      numberOfChildren,
      guestAges,
      numberOfRooms,
      roomIds,
    };
    console.log(booking);
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    axios
      .post("http://localhost:8081/api/api/user/makeBooking", booking, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        alert("Booking added successfully!");
      })
      .catch((error) => {
        console.error("There was an error in adding the booking!", error);
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

  return (
    <div>
      <h2>Add a New Booking</h2><br/>
      <div>
        <label>Check-In Date:</label>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Check-Out Date:</label>
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Number of Adults:</label>
        <input
          type="number"
          value={numberOfAdults}
          onChange={(e) => setNumberOfAdults(e.target.value)}
          min="1"
          required
        />
      </div>
      <div>
        <label>Number of Children:</label>
        <input
          type="number"
          value={numberOfChildren}
          onChange={(e) => setNumberOfChildren(e.target.value)}
          min="0"
        />
      </div>
      <div>
        <label>Guest Ages:</label>
        {guestAges.map((age, index) => (
          <input
            key={index}
            type="number"
            value={age}
            onChange={(e) => handleGuestAgeChange(index, e.target.value)}
            placeholder="Enter guest age"
          />
        ))}
        <button type="button" onClick={() => setGuestAges([...guestAges, ""])}>
          Add Guest Age
        </button>
      </div>
      <div>
        <label>Number of Rooms:</label>
        <input
          type="number"
          value={numberOfRooms}
          onChange={(e) => setNumberOfRooms(e.target.value)}
          min="1"
          required
        />
      </div>
      <div>
        <label>Room IDs:</label>
        {roomIds.map((roomId, index) => (
          <input
            key={index}
            type="text"
            value={roomId}
            onChange={(e) => handleRoomIdChange(index, e.target.value)}
            placeholder="Enter room ID"
          />
        ))}
        <button type="button" onClick={() => setRoomIds([...roomIds, ""])}>
          Add Room ID
        </button>
      </div>
      <button type="submit" onClick={addBooking}>
        Add Booking
      </button>
    </div>
  );
};

export default AddBooking;
