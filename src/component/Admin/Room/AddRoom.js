import React, { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material"; // Import Alert from MUI
import { useLocation } from "react-router-dom"; // Import useLocation to get hotelId from state

const AddRoom = () => {
  const location = useLocation(); // Use useLocation to access hotelId from the passed state
  const { hotelId } = location.state || {}; // Extract hotelId from state

  // Updated state variable names
  const [roomSizeState, setRoomSizeState] = useState("");
  const [bedSizeState, setBedSizeState] = useState("Single");
  const [maxOccupancyState, setMaxOccupancyState] = useState(2);
  const [baseFareState, setBaseFareState] = useState(1000);
  const [isACState, setIsACState] = useState(false);
  const [availableFromState, setAvailableFromState] = useState("");
  const [availableToState, setAvailableToState] = useState("");
  const [imageInputState, setImageInputState] = useState(""); // State for input field
  const [imagesState, setImagesState] = useState([]); // Store image URLs as an array

  // State for alerts
  const [alertMsgState, setAlertMsgState] = useState(""); // Message for success/error alerts
  const [alertTypeState, setAlertTypeState] = useState(""); // Type for alert severity (success, error)
  const [showAlertState, setShowAlertState] = useState(false); // State to show/hide alerts

  const addRoom = (e) => {
    e.preventDefault(); // Prevent form submission

    const room = {
      hotelId: parseInt(hotelId), // Ensure hotelId is an integer
      roomSize: roomSizeState,
      bedSize: bedSizeState,
      maxOccupancy: parseInt(maxOccupancyState), // Ensure maxOccupancy is an integer
      baseFare: parseFloat(baseFareState), // Ensure baseFare is a number
      availableFrom: availableFromState,
      availableTo: availableToState,
      images: imagesState, // Ensure images are an array of strings
      ac: isACState // Ensure ac is a boolean
    };

    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    console.log(room);
    axios
      .post("http://localhost:8080/api/owner/addRoom", room, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setAlertTypeState("success");
        setAlertMsgState("Room added successfully!");
        setShowAlertState(true);
      })
      .catch((error) => {
        console.error("There was an error adding the room!", error);
        setAlertTypeState("error");
        setAlertMsgState("Failed to add the room");
        setShowAlertState(true);
      })
      .finally(() => {
        // Hide alert after 3 seconds
        setTimeout(() => {
          setShowAlertState(false);
        }, 3000);
      });
  };

  // Add image URL to the array
  const handleAddImage = () => {
    if (imageInputState.trim()) {
      setImagesState([...imagesState, imageInputState]);
      setImageInputState(""); // Clear input after adding
    }
  };

  // Remove image from the array
  const handleRemoveImage = (index) => {
    const updatedImages = imagesState.filter((_, i) => i !== index);
    setImagesState(updatedImages);
  };

  return (
    <div>
      {showAlertState && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
            width: "320px",
          }}
        >
          <Alert severity={alertTypeState}>{alertMsgState}</Alert>
        </div>
      )}

      <h2>Add a New Room</h2>
      <form onSubmit={addRoom}>
        <div>
          <label>Room Size:</label>
          <input
            type="text"
            value={roomSizeState}
            placeholder="Enter room size"
            onChange={(e) => setRoomSizeState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Bed Size:</label>
          <input
            type="text"
            value={bedSizeState}
            placeholder="Enter bed size"
            onChange={(e) => setBedSizeState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Max Occupancy:</label>
          <input
            type="number"
            value={maxOccupancyState}
            placeholder="Enter max occupancy"
            onChange={(e) => setMaxOccupancyState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Base Fare:</label>
          <input
            type="number"
            value={baseFareState}
            placeholder="Enter base fare"
            onChange={(e) => setBaseFareState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>AC Available:</label>
          <input
            type="checkbox"
            checked={isACState}
            onChange={(e) => setIsACState(e.target.checked)}
          />
        </div>
        <div>
          <label>Available From:</label>
          <input
            type="date"
            value={availableFromState}
            onChange={(e) => setAvailableFromState(e.target.value)}
          />
        </div>
        <div>
          <label>Available To:</label>
          <input
            type="date"
            value={availableToState}
            onChange={(e) => setAvailableToState(e.target.value)}
          />
        </div>
        <div>
          <label>Image URLs</label>
          <input
            type="text"
            value={imageInputState}
            placeholder="Enter image URL"
            onChange={(e) => setImageInputState(e.target.value)}
          />
          <button type="button" onClick={handleAddImage}>
            Add Image
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {imagesState.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Room Preview ${index + 1}`}
                style={{ width: "100px", height: "100px" }}
              />
              <button type="button" onClick={() => handleRemoveImage(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;
