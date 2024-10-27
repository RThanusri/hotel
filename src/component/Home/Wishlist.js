import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Wishlist = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [wishlist, setWishlist] = React.useState({});
  const [hotels, setHotels] = React.useState([]);

  const fetchUserWishlist = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      console.error("User ID or token not found");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/user/getUserWishList/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const hotelIds = response.data.map(item => item.hotelId);
      console.log("Hotel IDs from wishlist:", hotelIds);

      const hotelPromises = hotelIds.map(hotelId =>
        axios.get(`http://localhost:8080/api/shared/getHotelById/${hotelId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      const hotelResponses = await Promise.all(hotelPromises);
      const hotelData = hotelResponses.map(res => res.data);

      setHotels(hotelData);

      const wishlistItems = hotelIds.reduce((acc, hotelId) => {
        acc[hotelId] = true;
        return acc;
      }, {});

      setWishlist(wishlistItems);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setSnackbarMessage("Failed to fetch wishlist. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchUserWishlist();
  }, []);

  const handleRoomDetailsClick = (hotelId) => {
    navigate(`/exploreroomlistings/${hotelId}`);
  };

  const handleMoreDetailsClick = (hotel) => {
    navigate(`/hotelDetails/${hotel.id}`, { state: { hotel } });
  };

  const handleToggleWishlist = async (hotel) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      console.error("User ID or token not found");
      return;
    }

    const wishListDTO = {
      userId: parseInt(userId),
      hotelId: hotel.id,
    };

    try {
      let response;

      if (wishlist[hotel.id]) {
        response = await axios.delete(`http://localhost:8080/api/user/removeWishList/${userId}/${hotel.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setSnackbarMessage(`${hotel.name} has been removed from your favorites!`);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          // Fetch updated wishlist
          fetchUserWishlist();
        }
      } else {
        response = await axios.post('http://localhost:8080/api/user/addWishList', wishListDTO, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200 || response.status === 201) {
          setSnackbarMessage(`${hotel.name} has been added to your favorites!`);
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          // Fetch updated wishlist
          fetchUserWishlist();
        }
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      setSnackbarMessage("Failed to update favorites. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f7f7f7' }}>
      <Grid container spacing={2} sx={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
        {hotels.length > 0 ? (
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
                    <IconButton
                      onClick={() => handleToggleWishlist(hotel)}
                      sx={{ color: wishlist[hotel.id] ? 'red' : 'gray' }}
                    >
                      {wishlist[hotel.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary" textAlign="center">
              No hotels found in your wishlist.
            </Typography>
          </Grid>
        )}
      </Grid>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Wishlist;
