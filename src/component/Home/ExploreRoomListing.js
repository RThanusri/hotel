import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Pagination,
  Button, // Import Button component
} from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './ExploreRoomListings.css';

const ExploreRoomListing = () => {
  const { hotelId } = useParams();
  const nav = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchRooms = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:8080/api/shared/allRoomsInHotel/${hotelId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("Error fetching rooms. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  if (loading) return <CircularProgress />;

  const totalPages = Math.ceil(rooms.length / itemsPerPage);
  const indexOfLastRoom = currentPage * itemsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - itemsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <center>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }} gutterBottom>
          Rooms for Hotel ID: {hotelId}
        </Typography>
        <br />
      </center>
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {currentRooms.length > 0 ? (
          currentRooms.map((room) => (
            <RoomCard 
              room={room} 
              key={room.id} 
              onReviewClick={() => nav(`/reviews/${hotelId}`)}  
              handleReserve={() => nav('/addBooking')} 
            />
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ width: '100%' }}>
            No rooms available.
          </Typography>
        )}
      </Box>
      
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="error"
        />
      </Box>

      {/* Add the new button here */}
      
    </Box>
  );
};

const RoomCard = ({ room, onReviewClick, handleReserve }) => {
  return (
    <Card sx={{ width: 500, height: 850, borderRadius: 2, boxShadow: 3 }}>
      <Carousel showArrows={true} autoPlay interval={4000} infiniteLoop>
        {room.images && room.images.length > 0 ? (
          room.images.map((image, index) => (
            <div key={index} style={{ height: '350px', overflow: 'hidden' }}>
              <img 
                src={image || 'placeholder.jpg'} 
                alt={`Room ${room.id}`} 
                style={{ height: 'auto', width: '100%', objectFit: 'cover' }} 
              />
            </div>
          ))
        ) : (
          <div style={{ height: '350px', overflow: 'hidden' }}>
            <img src='placeholder.jpg' alt="No image available" style={{ height: 'auto', width: '100%', objectFit: 'cover' }} />
          </div>
        )}
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
              color: '#cc0000', 
              mt: 5, 
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
              color: '#cc0000', 
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

export default ExploreRoomListing;
