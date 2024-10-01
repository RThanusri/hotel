import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
  Button, // Import Button component
} from "@mui/material";

const HotelReviews = () => {
  const { hotelId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:8080/api/shared/hotelReviews/${hotelId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Error fetching reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [hotelId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const totalReviews = reviews.length;

  const calculateOverallRating = () => {
    if (totalReviews === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.overallRating, 0);
    return (totalRating / totalReviews).toFixed(2);
  };

  const overallRating = calculateOverallRating();

  return (
    <Box sx={{ p: 4, bgcolor: 'lavender', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Rated {overallRating} out of 5 from {totalReviews} reviews.
      </Typography>
      <Typography variant="h6" color="text.primary" textAlign="center">
        Guest favourite: One of the most loved homes on Cozy Haven Stay based on ratings, reviews, and reliability
      </Typography>
      <Divider sx={{ my: 2, width: '100%' }} />

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h6">Overall rating</Typography>
            <Rating name="overall-rating" value={parseFloat(overallRating)} readOnly precision={0.1} sx={{ color: '#cc0000' }} />
            <Typography variant="body2">
              {overallRating} stars, {((overallRating / 5) * 100).toFixed(0)}% of reviews 
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => navigate(`/addReview/${hotelId}`)} 
      >
        Add Review
      </Button>

      <Typography variant="h5" sx={{ mt: 4, textAlign: 'center', fontWeight: "bold", color: 'black' }}>Reviews</Typography>
      {reviews.length > 0 ? (
        <List sx={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
          {reviews.map((review) => (
            <Paper key={review.reviewId} elevation={2} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      User ID: {review.userId} - <Rating name="review-rating" value={review.overallRating} readOnly sx={{ color: '#cc0000' }} />
                    </Typography>
                  }
                  secondary={
                    <>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body1" color="black">
                        {review.reviewText}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2" sx={{ color: 'black' }} >Cleanliness: <Rating value={review.cleanlinessRating} readOnly sx={{ color: '#cc0000' }} /></Typography>
                      <Typography variant="body2" sx={{ color: 'black' }}>Staff Service: <Rating value={review.staffServiceRating} readOnly sx={{ color: '#cc0000' }} /></Typography>
                      <Typography variant="body2" sx={{ color: 'black' }}>Amenities: <Rating value={review.amenitiesRating} readOnly sx={{ color: '#cc0000' }} /></Typography>
                      <Typography variant="body2" sx={{ color: 'black' }}>Property Conditions: <Rating value={review.propertyConditionsRating} readOnly sx={{ color: '#cc0000' }} /></Typography>
                      <Typography variant="body2" sx={{ color: 'black' }}>Eco-Friendliness: <Rating value={review.ecoFriendlinessRating} readOnly sx={{ color: '#cc0000' }} /></Typography>
                    </>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      ) : (
        <Typography textAlign="center">No reviews available for this hotel.</Typography>
      )}
    </Box>
  );
};

export default HotelReviews;
