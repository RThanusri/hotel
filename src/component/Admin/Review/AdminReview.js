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
import AdminNavBar from "../AdminNavBar/AdminNavBar";

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

  return (<>
  <AdminNavBar/>

    <Box sx={{ p: 4, bgcolor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',my:-20 }}>
      
      

      
      <Typography variant="h5" sx={{ mt: 4, textAlign: 'center' }}>Reviews</Typography>
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
                      <Typography variant="body1" color="text.primary">
                        {review.reviewText}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2">Cleanliness: <Rating value={review.cleanlinessRating} readOnly sx={{ color: '#cc0000' }}/></Typography>
                      <Typography variant="body2">Staff Service: <Rating value={review.staffServiceRating} readOnly sx={{ color: '#cc0000' }}/></Typography>
                      <Typography variant="body2">Amenities: <Rating value={review.amenitiesRating} readOnly sx={{ color: '#cc0000' }} /></Typography>
                      <Typography variant="body2">Property Conditions: <Rating value={review.propertyConditionsRating} readOnly sx={{ color: '#cc0000' }}/></Typography>
                      <Typography variant="body2">Eco-Friendliness: <Rating value={review.ecoFriendlinessRating} readOnly sx={{ color: '#cc0000' }}/></Typography>
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
    </>
    
  );
};

export default AdminReview;