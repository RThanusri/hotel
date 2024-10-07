import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import "./HotelCard.css";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material"; // Import Alert from MUI

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
  const [detailsOpen, setDetailsOpen] = useState(false); // Modal for details
  const [nName, setNName] = useState(name);
  const [nDescription, setNDescription] = useState(description);
  const [nAmenities, setNAmenities] = useState(amenities);
  const [nImage, setNImage] = useState(image);
  const [nAddress, setNAddress] = useState(address);
  const [nPhoneNo, setNPhoneNo] = useState(phoneNo);

  // State for alerts
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState(''); // Type for alert severity (success, error)
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alerts

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNImage(imageUrl);
    }
  };

  const handleUpdate = () => {
    const updatedData = {};

    if (nName !== name) {
      updatedData.name = nName;
    }

    if (nPhoneNo !== phoneNo) {
      updatedData.phoneNo = nPhoneNo;
    }

    if (nDescription !== description) {
      updatedData.description = nDescription;
    }

    if (nAddress !== address) {
      updatedData.address = nAddress;
    }

    if (nImage !== image) {
      updatedData.image = nImage;
    }

    if (nAmenities !== amenities) {
      updatedData.amenities = nAmenities;
    }
    if (Object.keys(updatedData).length > 0) {
      update(id, updatedData);
      setAlertType('success');
      setAlertMsg('Hotel updated successfully!');
      setShowAlert(true);
      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
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
    remove(id); // Call the remove function passed as prop
    setAlertType('success');
    setAlertMsg('Hotel removed successfully!');
    setShowAlert(true);
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleReserve = () => {
    navigate("/addBooking");
  };

  const handleImageClick = () => {
    navigate(`/room/${id}`);
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
        <div className="card">
          {/* Display image first */}
          {nImage && (
            <img
              src={nImage}
              alt="Hotel Image"
              style={{ width: "250px", height: "150px", cursor: "pointer", borderRadius: "10px" }}
              onClick={handleImageClick} // Click the image to navigate
            />
          )}
          <h3>Hotel Id: {id}</h3>
          <h2>{name}</h2>

          <p>{description}</p>

          {/* View Details and Remove buttons */}
          <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
            <button 
              style={{ backgroundColor: "#cc0000", color: "#fff", border: "none", padding: "10px 20px", margin: "0 5px", cursor: "pointer" }} 
              onClick={() => setDetailsOpen(true)}
            >
              View Details
            </button>
            <button 
              style={{ backgroundColor: "#cc0000", color: "#fff", border: "none", padding: "10px 20px", margin: "0 5px", cursor: "pointer" }} 
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>

          {/* Reserve and Update buttons */}
          <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
            <button 
              style={{ backgroundColor: "#cc0000", color: "#fff", border: "none", padding: "10px 20px", margin: "0 5px", cursor: "pointer" }} 
              onClick={handleReserve}
            >
              Reserve
            </button>
            <button 
              style={{ backgroundColor: "#cc0000", color: "#fff", border: "none", padding: "10px 20px", margin: "0 5px", cursor: "pointer" }} 
              onClick={() => setOpen(true)}
            >
              Update
            </button>
          </div>

          {/* Modal for showing full details */}
          <Modal
            open={detailsOpen}
            onClose={() => setDetailsOpen(false)}
            size="small"
            style={{
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              background: "#f0f0f0",
            }}
          >
            <Modal.Header style={{ background: "#cc0000", color: "#fff" }}>Hotel Details</Modal.Header>
            <Modal.Content>
              <p style={{ color: 'black' }}><strong>Name:</strong></p>
              <p style={{ color: 'black' }}>{nName}</p>
              <p style={{ color: 'black' }}><strong>Description:</strong></p>
              <p style={{ color: 'black' }}>{nDescription}</p>
              <p style={{ color: 'black' }}><strong>Amenities:</strong></p>
              <p style={{ color: 'black' }}>{nAmenities}</p>
              <p style={{ color: 'black' }}><strong>Address:</strong></p>
              <p style={{ color: 'black' }}>{nAddress}</p>
              <p style={{ color: 'black' }}><strong>Phone No:</strong></p>
              <p style={{ color: 'black' }}>{nPhoneNo}</p>
              {nImage && <img src={nImage} alt="Hotel Image" style={{ width: "150px", height: "150px", borderRadius: "10px" }} />}
            </Modal.Content>
            <Modal.Actions>
              <Button style={{ backgroundColor: "#cc0000", color: "#fff" }} onClick={() => setDetailsOpen(false)}>Close</Button>
            </Modal.Actions>
          </Modal>

          {/* Modal for update */}
          <Modal
            onClose={() => setOpen(false)}
            open={open}
          >
            <Modal.Header>Update Hotel Information</Modal.Header>
            <Modal.Content>
              <input
                type="text"
                value={nName}
                placeholder={name}
                onChange={(e) => setNName(e.target.value)}
              />
              <br />
              <input
                type="text"
                value={nDescription}
                placeholder={description}
                onChange={(e) => setNDescription(e.target.value)}
              />
              <br />
              <input
                type="text"
                value={nAmenities}
                placeholder={amenities}
                onChange={(e) => setNAmenities(e.target.value)}
              />
              <br />
              <input
                type="text"
                value={nAddress}
                placeholder={address}
                onChange={(e) => setNAddress(e.target.value)}
              />
              <br />
              <input
                type="text"
                value={nPhoneNo}
                placeholder={phoneNo}
                onChange={(e) => setNPhoneNo(e.target.value)}
              />
              <label>Images (comma-separated URLs):</label>
              <input
                type="text"
                value={nImage}
                placeholder="Enter image URLs separated by commas"
                onChange={(e) => setNImage(e.target.value)}
              />
              <br />
              {nImage && (
                <img
                  src={nImage}
                  alt="New Image"
                  style={{ width: "100px", height: "100px" }}
                />
              )}
              <br />
              <Button onClick={handleUpdate}>Confirm</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </Modal.Content>
          </Modal>
        </div>
      </center>
    </>
  );
};

export default HotelCard;
