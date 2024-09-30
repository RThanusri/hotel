import React from "react";
import { Card, CardContent, Typography, Grid} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExploreByAmenities = () => {
  const amenities = [
    { title: 'Pool', description: 'Find hotels with pools.', icon: '🏊' },
    { title: 'Free WiFi', description: 'Hotels with complimentary WiFi.', icon: '📶' },
    { title: 'Breakfast Included', description: 'Enjoy breakfast at these hotels.', icon: '🍳' },
    { title: 'Pet-Friendly', description: 'Stay with your furry friends.', icon: '🐾' },
    { title: 'Free Parking', description: 'Enjoy complimentary parking.', icon: '🅿️' },
    { title: 'Washing Machine', description: 'In-room washing machines available.', icon: '🧺' },
    { title: 'AC', description: 'Stay cool with air conditioning.', icon: '❄️' },
    { title: 'Fireplace', description: 'Cozy up with an in-room fireplace.', icon: '🔥' },
    { title: 'TV', description: 'Enjoy your favorite shows in-room.', icon: '📺' },
    { title: 'Heating', description: 'Stay warm with heating options.', icon: '🌡️' },
    { title: 'Barbeque', description: 'Grill your favorites in our outdoor spaces.', icon: '🍖' },
    { title: 'Spa Services', description: 'Relax and rejuvenate with spa services.', icon: '💆‍♀️' },
  ];

  const navigate = useNavigate();

  const handleCardClick = async (amenityTitle) => {
    const token = localStorage.getItem('token');

    const params = { amenities: amenityTitle };

    try {
      const response = await axios.get('http://localhost:8081/api/user/searchHotelByAmenities', {
        params,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      
      navigate('/explorehotelListings', {
        state: {
          hotels: response.data,
        },
      });
    } catch (error) {
      console.error("Error displaying hotels:", error.response ? error.response.data : error.message);
      alert("Error displaying hotels. Please try again later.");
    }
  };

  return (
    <div className="amenities">
      <Typography variant="h4" gutterBottom align="center" style={{fontWeight: 'bold', fontSize: '3.0rem',padding:'20px'}}>
        Get Specific with Your Favourite Amenities
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" style={{ marginBottom: '30px',color: '#000', fontWeight: 'normal', fontSize: '2.0rem', marginTop: '10px'}}>
        Choose from top features like these – and more – for a personalised stay.
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {amenities.map((amenity, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card variant="outlined" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleCardClick(amenity.title)}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ fontSize: '40px' }}>
                  {amenity.icon}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {amenity.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {amenity.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ExploreByAmenities;
