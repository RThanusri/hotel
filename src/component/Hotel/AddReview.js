import { Rating, TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddReview = () => {
  const [reviewText, setReviewText] = useState('');
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [staffServiceRating, setStaffServiceRating] = useState(0);
  const [amenitiesRating, setAmenitiesRating] = useState(0);
  const [propertyConditionsRating, setPropertyConditionRating] = useState(0);
  const [ecoFriendlinessRating, setEcoFriendlinessRating] = useState(0);
  const [error, setError] = useState(null);
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const params = {
      reviewText,
      cleanlinessRating,
      staffServiceRating,
      amenitiesRating,
      propertyConditionsRating,
      ecoFriendlinessRating,
      userId,
      hotelId,
    };

    try {
      await axios.post('http://localhost:8081/api/user/submitReview', params, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      navigate(`/reviews/${hotelId}`);
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Error submitting review. Please try again later.");
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#E6E6FA', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: '100%', maxWidth: 900, border: '2px solid black' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#cc0000' }}>
          Add Your Review
        </Typography>
        
        {error && <Typography color="error">{error}</Typography>}
        
        <TextField
          label="Review Text"
          multiline
          rows={4}
          fullWidth
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{ mb: 2 }}
          variant="outlined"
        />

        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Cleanliness</Typography>
        <Rating
          value={cleanlinessRating}
          onChange={(event, newValue) => setCleanlinessRating(newValue)}
          sx={{ mb: 2 ,color:'#cc0000'}}
        />

        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Staff Service</Typography>
        <Rating
          value={staffServiceRating}
          onChange={(event, newValue) => setStaffServiceRating(newValue)}
          sx={{ mb: 2 ,color:'#cc0000'}}
        />

        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Amenities</Typography>
        <Rating
          value={amenitiesRating}
          onChange={(event, newValue) => setAmenitiesRating(newValue)}
          sx={{ mb: 2 ,color:'#cc0000'}}
        />

        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Property Conditions</Typography>
        <Rating
          value={propertyConditionsRating}
          onChange={(event, newValue) => setPropertyConditionRating(newValue)}
          sx={{ mb: 2 ,color:'#cc0000'}}
        />

        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Eco-Friendliness</Typography>
        <Rating
          value={ecoFriendlinessRating}
          onChange={(event, newValue) => setEcoFriendlinessRating(newValue)}
          sx={{ mb: 2 ,color:'#cc0000'}}
        />
         <br/>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, bgcolor: '#cc0000', '&:hover': { bgcolor: '#ff0000' } }} 
        >
          Submit Review
        </Button>
      </Paper>
    </Box>
  );
};

export default AddReview;
