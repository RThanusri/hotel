import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ExploreHotelListings = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { hotels } = location.state || {};
  console.log(hotels);

  const handleRoomDetailsClick = (hotelId) => {

    navigate(`/exploreroomlistings/${hotelId}`, {
      
    });
  };

  const handleMoreDetailsClick = (hotel) => {
    navigate(`/hotelDetails/${hotel.id}`, { state: { hotel } });
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f7f7f7' }}>
      <Grid container spacing={2} sx={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
        {hotels && hotels.length > 0 ? (
          hotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  },
                  height: '100%',
                  borderRadius: '16px',
                  border: '2px solid black',
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={hotel.image}
                  alt={`${hotel.name} image`}
                  sx={{ objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#d32f2f', textAlign: 'center' }}>
                    {hotel.name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1rem', color: "black", mt: 1, textAlign: 'center' }}>
                    {hotel.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleRoomDetailsClick(hotel.id)}
                      sx={{ flexGrow: 1, marginRight: 1, '&:hover': { backgroundColor: '#1976d2' } }}
                    >
                      Room Details
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleMoreDetailsClick(hotel)}
                      sx={{ flexGrow: 1, marginLeft: 1, '&:hover': { backgroundColor: '#1976d2' } }}
                    >
                      More Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary" textAlign="center">
              No hotels found. Please try a different search.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ExploreHotelListings;
