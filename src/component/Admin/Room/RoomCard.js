import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import './RoomCard.css';
import { Alert } from "@mui/material"; // Import Alert from MUI

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
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [nRoomSize, setNRoomSize] = useState(roomSize);
  const [nBedSize, setNBedSize] = useState(bedSize);
  const [nMaxOccupancy, setNMaxOccupancy] = useState(maxOccupancy);
  const [nBaseFare, setNBaseFare] = useState(baseFare);
  const [nIsAC, setNIsAC] = useState(isAC);
  const [nAvailableFrom, setNAvailableFrom] = useState(availableFrom);
  const [nAvailableTo, setNAvailableTo] = useState(availableTo);
  const [nImages, setNImages] = useState(images.join(", "));
  const [alertMsg, setAlertMsg] = useState(''); // Alert message
  const [alertType, setAlertType] = useState(''); // Alert type
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alerts

  const handleUpdate = () => {
    const updatedData = {};

    if (nRoomSize !== roomSize) {
      updatedData.roomSize = nRoomSize;
    }

    if (nBedSize !== bedSize) {
      updatedData.bedSize = nBedSize;
    }

    if (nMaxOccupancy !== maxOccupancy) {
      updatedData.maxOccupancy = nMaxOccupancy;
    }

    if (nBaseFare !== baseFare) {
      updatedData.baseFare = nBaseFare;
    }

    if (nIsAC !== isAC) {
      updatedData.isAC = nIsAC;
    }

    if (nAvailableFrom !== availableFrom) {
      updatedData.availableFrom = nAvailableFrom;
    }

    if (nAvailableTo !== availableTo) {
      updatedData.availableTo = nAvailableTo;
    }

    if (nImages !== images.join(", ")) {
      updatedData.images = nImages.split(",").map((img) => img.trim());
    }

    if (Object.keys(updatedData).length > 0) {
      update(id, {
        ...updatedData,
      });
      // Show success alert after update
      setAlertType('success');
      setAlertMsg('Room updated successfully!');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    setOpen(false);
  };

  const handleClose = () => {
    // Reset fields to original values
    setNRoomSize(roomSize);
    setNBedSize(bedSize);
    setNMaxOccupancy(maxOccupancy);
    setNBaseFare(baseFare);
    setNIsAC(isAC);
    setNAvailableFrom(availableFrom);
    setNAvailableTo(availableTo);
    setNImages(images.join(", "));
    setOpen(false);
  };

  return (
    <>
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
      <center>
        <div className="room-card">
          <img
            src={images[0]} // show the first image
            alt="Room"
            style={{ cursor: "pointer" }}
          />
          <h3>Room Id: {id}</h3>
          <h4>Hotel Id: {hotelId}</h4>
          <p>Room Size: {roomSize}</p>
          <p>Bed Size: {bedSize}</p>
          <p>Max Occupancy: {maxOccupancy}</p>
          <p>Base Fare: {baseFare}</p>
          <p>AC Available: {isAC ? "Yes" : "No"}</p>
          <p>Available From: {availableFrom}</p>
          <p>Available To: {availableTo}</p>
          <button onClick={() => remove(id)}>Remove</button>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Update</Button>}
          >
            <input
              type="text"
              value={nRoomSize}
              placeholder={roomSize}
              onChange={(e) => setNRoomSize(e.target.value)}
            />
            <br />
            <input
              type="text"
              value={nBedSize}
              placeholder={bedSize}
              onChange={(e) => setNBedSize(e.target.value)}
            />
            <br />
            <input
              type="number"
              value={nMaxOccupancy}
              placeholder={maxOccupancy}
              onChange={(e) => setNMaxOccupancy(e.target.value)}
            />
            <br />
            <input
              type="number"
              value={nBaseFare}
              placeholder={baseFare}
              onChange={(e) => setNBaseFare(e.target.value)}
            />
            <br />
            <label>AC Available:</label>
            <input
              type="checkbox"
              checked={nIsAC}
              onChange={(e) => setNIsAC(e.target.checked)}
            />
            <br />
            <input
              type="date"
              value={nAvailableFrom}
              onChange={(e) => setNAvailableFrom(e.target.value)}
            />
            <br />
            <input
              type="date"
              value={nAvailableTo}
              onChange={(e) => setNAvailableTo(e.target.value)}
            />
            <br />
            <label>Image:</label>
            <input
              type="text"
              value={nImages}
              placeholder="Enter image URLs separated by commas"
              onChange={(e) => setNImages(e.target.value)}
            />
            <br />
            {nImages && (
              <img
                src={nImages.split(",")[0]} // Show the first image URL entered
                alt="New Image"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <br />
            <button onClick={handleUpdate}>Confirm</button>
            <button onClick={handleClose}>Cancel</button>
          </Modal>
        </div>
      </center>
    </>
  );
};

export default RoomCard;
