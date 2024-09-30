import React, { useState } from "react";
import axios from "axios";

const AddRoom = () => {
  const [roomSize, setRoomSize] = useState("");
  const [bedSize, setBedSize] = useState("Single");
  const [maxOccupancy, setMaxOccupancy] = useState(2);
  const [baseFare, setBaseFare] = useState(1000);
  const [isAC, setIsAC] = useState(false);
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [images, setImages] = useState("");

  const addRoom = () => {
    const room = {
      roomSize,
      bedSize,
      maxOccupancy,
      baseFare,
      isAC,
      availableFrom,
      availableTo,
      images,
    };

    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    axios
      .post("http://localhost:8081/api/owner/addRoom", room, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        alert("Room added successfully!");
      })
      .catch((error) => {
        console.error("There was an error in adding the room!", error);
        alert("Failed to add the room");
      });
  };

  return (
    <div>
      <h2>Add a New Room</h2>
      <form onSubmit={addRoom}>
        <div>
          <label>Room Size:</label>
          <input
            type="text"
            value={roomSize}
            placeholder="Enter room size"
            onChange={(e) => setRoomSize(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Bed Size:</label>
          <input
            type="text"
            value={bedSize}
            placeholder="Enter bed size"
            onChange={(e) => setBedSize(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Max Occupancy:</label>
          <input
            type="number"
            value={maxOccupancy}
            placeholder="Enter max occupancy"
            onChange={(e) => setMaxOccupancy(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Base Fare:</label>
          <input
            type="number"
            value={baseFare}
            placeholder="Enter base fare"
            onChange={(e) => setBaseFare(e.target.value)}
            required
          />
        </div>
        <div>
          <label>AC Available:</label>
          <input
            type="checkbox"
            checked={isAC}
            onChange={(e) => setIsAC(e.target.checked)}
          />
        </div>
        <div>
          <label>Available From:</label>
          <input
            type="date"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
          />
        </div>
        <div>
          <label>Available To:</label>
          <input
            type="date"
            value={availableTo}
            onChange={(e) => setAvailableTo(e.target.value)}
          />
        </div>
        <div>
          <label>Image </label>
          <input
            type="text"
            value={images}
            placeholder="Enter image URL"
            onChange={(e) => setImages(e.target.value)}
          />
          {images && (
            <img
              src={images}
              alt="New Room"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          )}
        </div>
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;
