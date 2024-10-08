import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Alert } from "@mui/material"; // Import Alert from MUI
import { useNavigate } from "react-router-dom";
import "./HotelCard.css";

const HotelCard = ({
  id,
  name = "test",
  phoneNo = "1235",
  address = "testing address",
  description = "test description",
  amenities = "test amenities",
  image,
  remove,
  update,
}) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [nName, setNName] = useState(name);
  const [nDescription, setNDescription] = useState(description);
  const [nAmenities, setNAmenities] = useState(amenities);
  const [nImage, setNImage] = useState(image);
  const [nAddress, setNAddress] = useState(address);
  const [nPhoneNo, setNPhoneNo] = useState(phoneNo);

  // State for alerts
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleImageClick = () => {
    navigate(`/room/${id}`);
  };

  const handleUpdate = () => {
    const updatedData = {};
    if (nName !== name) updatedData.name = nName;
    if (nPhoneNo !== phoneNo) updatedData.phoneNo = nPhoneNo;
    if (nDescription !== description) updatedData.description = nDescription;
    if (nAddress !== address) updatedData.address = nAddress;
    if (nImage !== image) updatedData.image = nImage;
    if (nAmenities !== amenities) updatedData.amenities = nAmenities;

    if (Object.keys(updatedData).length > 0) {
      update(id, updatedData);
      setAlertType('success');
      setAlertMsg('Hotel updated successfully!');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setNImage(image);
    setNDescription(description);
    setNName(name);
    setNAmenities(amenities);
    setNAddress(address);
    setNPhoneNo(phoneNo);
    setOpen(false);
  };

  const handleRemove = () => {
    remove(id);
    setAlertType('success');
    setAlertMsg('Hotel removed successfully!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleReserve = () => {
    navigate("/addBooking");
  };

  return (
    <>
      {showAlert && (
        <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000, width: "320px" }}>
          <Alert severity={alertType}>{alertMsg}</Alert>
        </div>
      )}

      <center>
        <div className="card" style={{ padding: '20px', borderRadius: '10px', border: '1px solid #cc0000', margin: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',width:'500px' }}>
          {nImage && (
            <img
              src={nImage}
              alt="Hotel Image"
              style={{ width: "100%", height: "350px", cursor: "pointer", borderRadius: "10px" }}
              onClick={handleImageClick}
            />
          )}
          <h3>Hotel Id: {id}</h3>
          <h2>{name}</h2>
          <p>{description}</p>

          <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
            <Button
              style={{ backgroundColor: "#cc0000", color: "#fff", margin: "0 5px" }}
              onClick={() => setDetailsOpen(true)}
            >
              View Details
            </Button>
            <Button
              style={{ backgroundColor: "#cc0000", color: "#fff", margin: "0 5px" }}
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
            <Button
              style={{ backgroundColor: "#cc0000", color: "#fff", margin: "0 5px" }}
              onClick={handleReserve}
            >
              Reserve
            </Button>
            <Button
              style={{ backgroundColor: "#cc0000", color: "#fff", margin: "0 5px" }}
              onClick={() => setOpen(true)}
            >
              Update
            </Button>
          </div>

          <Modal
            open={detailsOpen}
            onClose={() => setDetailsOpen(false)}
            size="small"
            style={{ borderRadius: "10px", padding: "20px", textAlign: "center", background: "#f0f0f0",maxHeight:'700px' }}
          >
            <Modal.Header style={{ background: "#cc0000", color: "#fff" }}>Hotel Details</Modal.Header>
            <Modal.Content>
              <p style={{ color: 'black' }}><strong>Name:</strong> {nName}</p>
              <p style={{ color: 'black' }}><strong>Description:</strong> {nDescription}</p>
              <p style={{ color: 'black' }}><strong>Amenities:</strong> {nAmenities}</p>
              <p style={{ color: 'black' }}><strong>Address:</strong> {nAddress}</p>
              <p style={{ color: 'black' }}><strong>Phone No:</strong> {nPhoneNo}</p>
              {nImage && <img src={nImage} alt="Hotel Image" style={{ width: "150px", height: "150px", borderRadius: "10px" }} />}
            </Modal.Content>
            <Modal.Actions>
              <Button style={{ backgroundColor: "#cc0000", color: "#fff" }} onClick={() => setDetailsOpen(false)}>Close</Button>
            </Modal.Actions>
          </Modal>

          <Modal onClose={() => setOpen(false)} open={open}>
            <Modal.Header>Update Hotel Information</Modal.Header>
            <Modal.Content>
              <input
                type="text"
                value={nName}
                placeholder="Enter hotel name"
                onChange={(e) => setNName(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <input
                type="text"
                value={nDescription}
                placeholder="Enter description"
                onChange={(e) => setNDescription(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <input
                type="text"
                value={nAmenities}
                placeholder="Enter amenities"
                onChange={(e) => setNAmenities(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <input
                type="text"
                value={nAddress}
                placeholder="Enter address"
                onChange={(e) => setNAddress(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <input
                type="text"
                value={nPhoneNo}
                placeholder="Enter phone number"
                onChange={(e) => setNPhoneNo(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <label>Images (comma-separated URLs):</label>
              <input
                type="text"
                value={nImage}
                placeholder="Enter image URLs separated by commas"
                onChange={(e) => setNImage(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              {nImage && <img src={nImage} alt="New Image" style={{ width: "100px", height: "100px" }} />}
              <Button onClick={handleUpdate} style={{ backgroundColor: "#cc0000", color: "#fff", marginTop: "10px" }}>Confirm</Button>
              <Button onClick={handleClose} style={{ marginLeft: "10px" }}>Cancel</Button>
            </Modal.Content>
          </Modal>
        </div>
      </center>
    </>
  );
};

export default HotelCard;
