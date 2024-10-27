import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";

const HotelDetails = () => {
  const location = useLocation();
  const { hotel } = location.state || {};

  if (!hotel) {
    return <Typography variant="h6" color="red">No hotel data available.</Typography>;
  }

  const amenitiesList = hotel.amenities.split(',').map(item => item.trim());

  return (
    <Box 
      sx={{ 
        p: 3, 
        backgroundColor: 'white', 
        borderRadius: 2, 
        boxShadow: 3,
        width: '1200px',  
        height: 'auto',
        maxHeight: '90vh',
        overflowY: 'auto',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#d32f2f', textAlign: 'center', mb: 2 }}>
        {hotel.name}
      </Typography>
      
      <Typography variant="body1" sx={{fontSize: '1.5rem', color: 'black', textAlign: 'center' }}>
        <strong>Amenities</strong>
      </Typography><br/>

      <Grid container spacing={2}>
        {amenitiesList.length > 0 ? amenitiesList.map((amenity, index) => (
          <Grid item xs={6} key={index}>
            <Typography variant="body1" sx={{ color: 'black' }}>
              - {amenity}
            </Typography>
          </Grid>
        )) : (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ color: 'black' }}>
              No amenities available.
            </Typography>
          </Grid>
        )}
      </Grid>

      <Typography variant="body1" sx={{ mt: 2, color: 'black' }}>
        <strong>Number of Rooms:</strong> {hotel.noOfRooms}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, color: 'black' }}>
        <strong>Address:</strong> {hotel.address}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: 'black' }}>
        <strong>Phone No:</strong> {hotel.phoneNo}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: 'black' }}>
        <strong>Description:</strong> {hotel.description}
      </Typography>
    </Box>
  );
};

export default HotelDetails;
