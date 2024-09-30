import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Button, Box } from "@mui/material";

const About = () => {
  return (
    <Container
      maxWidth='xl'
      sx={{
        padding: '3rem',
        backgroundColor: '#F0F8FF', // Light blue background
        borderRadius: '12px',
        color: '#333', // Dark grey text
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
        marginTop: '2rem',
        border: '2px solid black', // Black border
      }}
    >
      <Typography variant="h2" gutterBottom align='center' sx={{ fontWeight: 'bold', color: '#cc0000' }}>
        About Us
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem', lineHeight: 1.6 }}>
        Welcome to Cozy Haven Stay, where your comfort is our priority! At Cozy
        Haven Stay, we believe that a great stay is not just about a place to
        sleep; it's about creating unforgettable memories. Our hotel is designed
        to provide you with a warm and inviting atmosphere that feels just like
        home.
      </Typography>

      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#cc0000' }}>
        Our Mission
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem', lineHeight: 1.6 }}>
        Our mission is to provide exceptional hospitality and personalized
        service to every guest. We aim to exceed your expectations and ensure
        your stay is as enjoyable as possible. Whether you're traveling for
        business or leisure, we have the perfect accommodations and amenities to
        meet your needs.
      </Typography>

      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#cc0000' }}>
        Why Choose Us?
      </Typography>
      <List sx={{ paddingLeft: 0 }}>
        {[
          "✨ Comfortable Accommodations: Choose from a range of stylish and cozy rooms equipped with modern amenities.",
          "🍽️ Delicious Dining: Enjoy a variety of culinary delights at our in-house restaurant, serving both local and international cuisine.",
          "🌐 Free Wi-Fi: Stay connected with complimentary high-speed internet throughout the hotel.",
          "🏊 Relaxation Facilities: Unwind in our spa or take a dip in our swimming pool after a long day of exploration.",
          "🛎️ 24/7 Customer Service: Our friendly staff is available around the clock to assist you with any requests or inquiries."
        ].map((text, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={text}
              sx={{ fontSize: '1.4rem', lineHeight: 1.5 }} // Set font size here
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#cc0000' }}>
        Join Us
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
        We invite you to experience the Cozy Haven Stay difference. Book your
        stay with us today and discover a world of comfort and luxury. Let us be
        your home away from home, where every moment is a cherished memory.
      </Typography>
      
      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#cc0000', // Button color
            color: '#fff',
            padding: '0.8rem 2rem',
            '&:hover': {
              backgroundColor: 'white', // Button hover color
              color: '#cc0000', // Change text color on hover
            },
          }}
          href="/addbooking"
        >
          Book Now
        </Button>
      </Box>
    </Container>
  );
};

export default About;
