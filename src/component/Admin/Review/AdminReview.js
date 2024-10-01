import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";

const AdminReview = () => {
  const { hotelId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('token');
        const hotelId=1;
      try {
        const response = await axios.get(`http://localhost:8080/api/shared/hotelReviews/${hotelId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setReviews(response.data);
        console.log("inside review getting function")
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
      <Typography variant="h6" color="text.secondary" textAlign="center">
        Guest favourite: One of the most loved homes on Cozy Haven Stay based on ratings, reviews, and reliability
      </Typography>
      <Divider sx={{ my: 2, width: '100%' }} />

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h6">Overall rating</Typography>
            <Rating name="overall-rating" value={parseFloat(overallRating)} readOnly precision={0.1} />
            <Typography variant="body2">
              {overallRating} stars, {((overallRating / 5) * 100).toFixed(0)}% of reviews
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, textAlign: 'center' }}>Reviews</Typography>
      {reviews.length > 0 ? (
        <List sx={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
          {reviews.map((review) => (
            <Paper key={review.reviewId} elevation={2} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                      User ID: {review.userId} - <Rating name="review-rating" value={review.overallRating} readOnly />
                    </Typography>
                  }
                  secondary={
                    <>
                      
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body1" color="text.primary">
                        {review.reviewText}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2">Cleanliness: <Rating value={review.cleanlinessRating} readOnly /></Typography>
                      <Typography variant="body2">Staff Service: <Rating value={review.staffServiceRating} readOnly /></Typography>
                      <Typography variant="body2">Amenities: <Rating value={review.amenitiesRating} readOnly /></Typography>
                      <Typography variant="body2">Property Conditions: <Rating value={review.propertyConditionsRating} readOnly /></Typography>
                      <Typography variant="body2">Eco-Friendliness: <Rating value={review.ecoFriendlinessRating} readOnly /></Typography>
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

export default AdminReview;