import React, { useState } from "react";
import axios from "axios";
import { Alert, Box, Button, TextField, Typography, Checkbox, FormControlLabel, Paper } from "@mui/material"; 
import { useLocation } from "react-router-dom"; 

const AddRoom = () => {
  const location = useLocation(); 
  const { hotelId } = location.state || {}; // Fallback to an empty object to avoid errors

  const [roomSizeState, setRoomSizeState] = useState("");
  const [bedSizeState, setBedSizeState] = useState("Single");
  const [maxOccupancyState, setMaxOccupancyState] = useState(2);
  const [baseFareState, setBaseFareState] = useState(1000);
  const [isACState, setIsACState] = useState(false);
  const [availableFromState, setAvailableFromState] = useState("");
  const [availableToState, setAvailableToState] = useState("");
  const [imagesState, setImagesState] = useState([]);

  const [alertMsgState, setAlertMsgState] = useState("");
  const [alertTypeState, setAlertTypeState] = useState("");
  const [showAlertState, setShowAlertState] = useState(false);

  const addRoom = async (e) => {
    e.preventDefault();

    const room = {
      hotelId: parseInt(hotelId) || 0, // Fallback to 0 if hotelId is undefined
      roomSize: roomSizeState,
      bedSize: bedSizeState,
      maxOccupancy: parseInt(maxOccupancyState),
      baseFare: parseFloat(baseFareState),
      availableFrom: availableFromState,
      availableTo: availableToState,
      images: imagesState,
      ac: isACState,
    };

    const token = localStorage.getItem("token"); 
    try {
      const response = await axios.post("http://localhost:8080/api/owner/addRoom", room, {
        headers: {
          Authorization: `Bearer ${token}`, // Correct string interpolation with backticks
          "Content-Type": "application/json",
        },
      });
      setAlertTypeState("success");
      setAlertMsgState("Room added successfully!");
      setShowAlertState(true);
    } catch (error) {
      setAlertTypeState("error");
      setAlertMsgState("Failed to add the room");
      setShowAlertState(true);
    } finally {
      setTimeout(() => {
        setShowAlertState(false);
      }, 3000);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map(file => URL.createObjectURL(file));
    setImagesState(prevImages => [...prevImages, ...fileURLs]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = imagesState.filter((_, i) => i !== index);
    setImagesState(updatedImages);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: "auto", backgroundColor: "white" }}>
      {showAlertState && (
        <Box sx={{ position: "fixed", top: 20, right: 20, zIndex: 1000, width: "320px" }}>
          <Alert severity={alertTypeState}>{alertMsgState}</Alert>
        </Box>
      )}

      <Typography variant="h4" color="#cc0000" gutterBottom>Add New Room</Typography>
      <form onSubmit={addRoom}>
        <TextField
          label="Room Size"
          variant="outlined"
          value={roomSizeState}
          onChange={(e) => setRoomSizeState(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Bed Size"
          variant="outlined"
          value={bedSizeState}
          onChange={(e) => setBedSizeState(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Max Occupancy"
          variant="outlined"
          type="number"
          value={maxOccupancyState}
          onChange={(e) => setMaxOccupancyState(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Base Fare"
          variant="outlined"
          type="number"
          value={baseFareState}
          onChange={(e) => setBaseFareState(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isACState}
              onChange={(e) => setIsACState(e.target.checked)}
              color="error"
            />
          }
          label="AC Available"
        />
        <TextField
          label="Available From"
          variant="outlined"
          type="date"
          value={availableFromState}
          onChange={(e) => setAvailableFromState(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Available To"
          variant="outlined"
          type="date"
          value={availableToState}
          onChange={(e) => setAvailableToState(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginTop: 10 }}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
          {imagesState.map((image, index) => (
            <Box key={index} sx={{ position: "relative" }}>
              <img
                src={image}
                alt={`Room Preview ${index + 1}`} // Corrected alt attribute
                style={{ width: "100px", height: "100px" }}
              />
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleRemoveImage(index)}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Box>
        <Button type="submit" variant="contained" color="error" sx={{ marginTop: 2 }}>
          Add Room
        </Button>
      </form>
    </Paper>
  );
};

export default AddRoom;
