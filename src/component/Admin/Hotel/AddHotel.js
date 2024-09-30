import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
} from "@mui/material";

const AddHotel = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [noOfRooms, setNoOfRooms] = useState(0);

  const addHotel = (e) => {
    e.preventDefault();

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

    axios
      .post("http://localhost:8081/api/owner/addHotel", hotel, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("Hotel added successfully!");
      })
      .catch((error) => {
        console.error("There was an error in adding the hotel!", error);
        alert("Failed to add the hotel");
      });
  };

  return (
    <Box
      sx={{
        bgcolor: '#F5F5F5', // Background color
        width: '100vw', // Full viewport width
        height: '80vh', // Full viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 1,
          border: '2px solid grey', 
          width: '100%', 
          maxWidth: 900,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#cc0000' }} align="center" gutterBottom>
          Add a New Hotel
        </Typography>
        <form onSubmit={addHotel}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Hotel Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              InputProps={{
                sx: {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000', // Change border color on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000', // Change border color on focus
                  },
                },
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              InputProps={{
                sx: {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000',
                  },
                },
              }}
            />
            <TextField
              label="Amenities"
              variant="outlined"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              required
              InputProps={{
                sx: {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000',
                  },
                },
              }}
            />
            <TextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              InputProps={{
                sx: {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000',
                  },
                },
              }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
              InputProps={{
                sx: {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000',
                  },
                },
              }}
            />
            <TextField
              label="Number of Rooms"
              type="number"
              variant="outlined"
              value={noOfRooms}
              onChange={(e) => setNoOfRooms(e.target.value)}
              required
              InputProps={{
                sx: {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000',
                  },
                },
              }}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              InputProps={{
                sx: {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cc0000',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#cc0000',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#b30000',
                },
              }}
              type="submit"
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
