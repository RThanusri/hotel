import React, { useState } from "react";
import { Card, CardContent, Button, Modal, TextField, Checkbox, FormControlLabel, Alert, Box } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './RoomCard.css';

const RoomCard = ({
  id,
  hotelId,
  roomSize = "Default Size",
  bedSize = "Single",
  maxOccupancy = 2,
  baseFare = 1000,
  isAC = false,
  availableFrom = "2023-01-01",
  availableTo = "2023-12-31",
  images,
  remove,
  update,
}) => {
  const [open, setOpen] = useState(false);
  const [nRoomSize, setNRoomSize] = useState(roomSize);
  const [nBedSize, setNBedSize] = useState(bedSize);
  const [nMaxOccupancy, setNMaxOccupancy] = useState(maxOccupancy);
  const [nBaseFare, setNBaseFare] = useState(baseFare);
  const [nIsAC, setNIsAC] = useState(isAC);
  const [nAvailableFrom, setNAvailableFrom] = useState(availableFrom);
  const [nAvailableTo, setNAvailableTo] = useState(availableTo);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleUpdate = () => {
    const updatedData = {};
    if (nRoomSize !== roomSize) updatedData.roomSize = nRoomSize;
    if (nBedSize !== bedSize) updatedData.bedSize = nBedSize;
    if (nMaxOccupancy !== maxOccupancy) updatedData.maxOccupancy = nMaxOccupancy;
    if (nBaseFare !== baseFare) updatedData.baseFare = nBaseFare;
    if (nIsAC !== isAC) updatedData.isAC = nIsAC;
    if (nAvailableFrom !== availableFrom) updatedData.availableFrom = nAvailableFrom;
    if (nAvailableTo !== availableTo) updatedData.availableTo = nAvailableTo;
    if (uploadedImages.length > 0) updatedData.images = uploadedImages;

    if (Object.keys(updatedData).length > 0) {
      update(id, { ...updatedData });
      setAlertType('success');
      setAlertMsg('Room updated successfully!');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setNRoomSize(roomSize);
    setNBedSize(bedSize);
    setNMaxOccupancy(maxOccupancy);
    setNBaseFare(baseFare);
    setNIsAC(isAC);
    setNAvailableFrom(availableFrom);
    setNAvailableTo(availableTo);
    setUploadedImages([]); // Reset uploaded images
    setOpen(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map(file => URL.createObjectURL(file));
    setUploadedImages(prevImages => [...prevImages, ...fileURLs]);
  };

  return (
    <>
      {showAlert && (
        <Box sx={{ position: "fixed", top: 20, right: 20, zIndex: 1000, width: "320px" }}>
          <Alert severity={alertType}>{alertMsg}</Alert>
        </Box>
      )}
      <Card sx={{ width: 500, height: 800, margin: 2 }}> {/* Increased dimensions */}
        <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000} transitionTime={500}>
          {images.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Room ${id} - Image ${index + 1}`} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            </div>
          ))}
        </Carousel>
        <CardContent>
          <h3>Room Id: {id}</h3>
          <p>Room Size: {roomSize}</p>
          <p>Bed Size: {bedSize}</p>
          <p>Max Occupancy: {maxOccupancy}</p>
          <p>Base Fare: {baseFare}</p>
          <p>AC Available: {isAC ? "Yes" : "No"}</p>
          <p>Available From: {availableFrom}</p>
          <p>Available To: {availableTo}</p>
          <Button variant="contained" color="error" onClick={() => remove(id)}>
            Remove
          </Button>
          <Button variant="contained" color="error" onClick={() => setOpen(true)} sx={{ marginLeft: 1 }}>
            Update
          </Button>
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
          <h2>Update Room</h2>
          <TextField label="Room Size" value={nRoomSize} onChange={(e) => setNRoomSize(e.target.value)} fullWidth margin="normal" />
          <TextField label="Bed Size" value={nBedSize} onChange={(e) => setNBedSize(e.target.value)} fullWidth margin="normal" />
          <TextField label="Max Occupancy" type="number" value={nMaxOccupancy} onChange={(e) => setNMaxOccupancy(e.target.value)} fullWidth margin="normal" />
          <TextField label="Base Fare" type="number" value={nBaseFare} onChange={(e) => setNBaseFare(e.target.value)} fullWidth margin="normal" />
          <FormControlLabel control={<Checkbox checked={nIsAC} onChange={(e) => setNIsAC(e.target.checked)} />} label="AC Available" />
          <TextField label="Available From" type="date" value={nAvailableFrom} onChange={(e) => setNAvailableFrom(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          <TextField label="Available To" type="date" value={nAvailableTo} onChange={(e) => setNAvailableTo(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          
          {/* Image Upload Section */}
          <TextField 
            type="file" 
            inputProps={{ multiple: true }} 
            onChange={handleImageUpload} 
            fullWidth 
            margin="normal" 
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 2 }}>
            {uploadedImages.map((image, index) => (
              <img key={index} src={image} alt={`Uploaded Preview ${index + 1}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Confirm
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RoomCard;
