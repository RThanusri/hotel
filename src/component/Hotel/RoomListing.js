import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const RoomListing = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const nav = useNavigate();

  const {
    checkInDate,
    checkOutDate,
    numberOfRooms,
    numberOfAdults,
    numberOfChildren,
    hotelLocation,
  } = location.state;

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const token = localStorage.getItem('token');
      const searchParams = {
        hotelId,
        address: hotelLocation,
        checkInDate: checkInDate || null,
        checkOutDate: checkOutDate || null,
        numberOfRooms,
        numberOfAdults,
        numberOfChildren,
      };
      console.log(searchParams);

      try {
        const response = await axios.get('http://localhost:8080/api/user/searchRooms', {
          params: searchParams,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("Error fetching rooms. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId, hotelLocation, checkInDate, checkOutDate, numberOfRooms, numberOfAdults, numberOfChildren]);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ p: 3 }}>
      <center>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }} gutterBottom>
          Rooms for Hotel ID: {hotelId}
        </Typography><br />
      </center>
      {error && (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {rooms.map((room) => (
          <RoomCard 
            room={room} 
            key={room.id} 
            onReviewClick={() => nav(`/reviews/${hotelId}`)} 
            handleReserve={() => nav('/addBooking')} 
          />
        ))}
      </Box>
    </Box>
  );
};

const RoomCard = ({ room, onReviewClick, handleReserve }) => {
  return (
    <Card sx={{ width: 500, height: 800, borderRadius: 2, boxShadow: 3 }}>
      <Carousel showArrows={true} autoPlay interval={4000} infiniteLoop>
        {room.images.map((image, index) => (
          <div key={index} style={{ height: '350px', overflow: 'hidden' }}>
            <img 
              src={image || 'placeholder.jpg'} 
              alt={`Room ${room.id}`} 
              style={{ height: 'auto', width: '100%', objectFit: 'cover' }} 
            />
          </div>
        ))}
      </Carousel>
      
      <CardContent>
        <center>
        
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{`Room Size: ${room.roomSize}`}</Typography><br />
        <Typography variant="body2" sx={{ fontSize: '1.25rem' }}>{`Room ID: ${room.id}`}</Typography>
        <Typography variant="body1" sx={{ fontSize: '1.25rem' }}>{`Max Occupancy: ${room.maxOccupancy}`}</Typography>
        <Typography variant="body2" sx={{ fontSize: '1.25rem' }}>{`Bed Size: ${room.bedSize}`}</Typography>
        <Typography variant="body2" sx={{ fontSize: '1.25rem' }}>{`Base Fare: ₹${room.baseFare.toFixed(2)}`}</Typography>
        <Typography variant="body2" sx={{ fontSize: '1.25rem' }}>{`Air Conditioning: ${room.ac ? "Yes" : "No"}`}</Typography><br/>
        

        <Typography 
          component="a" 
          onClick={onReviewClick} 
          sx={{ 
            fontWeight: 'bold', 
            color: 'blue', 
            mt: 4, 
            textDecoration: 'none', 
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' } 
          }}
        >
          VIEW REVIEWS
        </Typography>
        
  
        <Box sx={{ mt: 2 }} /> 
        
        <Typography 
          component="a" 
          onClick={handleReserve} 
          sx={{ 
            fontWeight: 'bold', 
            color: 'blue', 
            textDecoration: 'none', 
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' }  
          }}
        >
          RESERVE
        </Typography>
        </center>
      </CardContent>
    </Card>
  );
};



export default RoomListing;
