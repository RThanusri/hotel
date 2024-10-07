import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Card, Alert } from "@mui/material";

const AddHotel = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [noOfRooms, setNoOfRooms] = useState(0);

  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleImageUpload = async () => {
    if (!imageFile) {
      setAlertType('error');
      setAlertMsg('Please select an image to upload.');
      setShowAlert(true);
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("http://localhost:8080/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setImageUrl(response.data);
      setAlertType('success');
      setAlertMsg('Image uploaded successfully!');
      setShowAlert(true);
    } catch (error) {
      console.error("Image upload failed:", error);
      setAlertType('error');
      setAlertMsg('Image upload failed');
      setShowAlert(true);
    }
  };

  const addHotel = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      setAlertType('error');
      setAlertMsg('Please upload an image before adding the hotel.');
      setShowAlert(true);
      return;
    }

    const userId = localStorage.getItem("userId");

    const hotel = {
      name,
      phoneNo,
      address,
      description,
      amenities,
      image: imageUrl,
      noOfRooms,
      userId,
    };

    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:8080/api/owner/addHotel", hotel, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setAlertType('success');
      setAlertMsg('Hotel added successfully!');
      setShowAlert(true);
    } catch (error) {
      console.error("There was an error in adding the hotel!", error);
      setAlertType('error');
      setAlertMsg('Failed to add the hotel');
      setShowAlert(true);
    } finally {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'white',
        width: '95%',
        height: '80vh',
        display: 'flex',
        marginTop: '100px',
        marginLeft: '30px',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
      }}
    >
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

      <Card
        sx={{
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 1,
          border: '2px solid grey',
          width: '80%',
          maxWidth: 900,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#cc0000' }} align="center" gutterBottom>
          Add New Hotel
        </Typography>
        <form onSubmit={addHotel}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Hotel Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              label="Amenities"
              variant="outlined"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              required
            />
            <TextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
            <TextField
              label="Number of Rooms"
              type="number"
              variant="outlined"
              value={noOfRooms}
              onChange={(e) => setNoOfRooms(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            />
            <Button
              variant="contained"
              onClick={handleImageUpload}
              sx={{
                backgroundColor: '#cc0000',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#b30000',
                },
              }}
            >
              Upload Image
            </Button>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded Preview"
                style={{ width: "200px", height: "200px", marginTop: "10px" }}
              />
            )}
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: '#cc0000',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#b30000',
                },
              }}
            >
              Add Hotel
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AddHotel;
