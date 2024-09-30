import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ExploreByDestinations = () => {
  const destinations = [
    { 
      title: 'Delhi', 
      description: 'Explore the capital city with rich history and culture.', 
      imageUrl: 'https://i.postimg.cc/FFf7tg8C/delhi.jpg'
    },
    { 
      title: 'Mumbai', 
      description: 'Experience the vibrant city of dreams and Bollywood.', 
      imageUrl: 'https://i.postimg.cc/jSSp9vkL/mumbai.webp'
    },
    { 
      title: 'Bengaluru', 
      description: 'Discover the Silicon Valley of India with its gardens and nightlife.', 
      imageUrl: 'https://i.postimg.cc/sDNmjcgB/bengaluru.jpg'
    },
    { 
      title: 'Jaipur', 
      description: 'Visit the Pink City, known for its stunning palaces and forts.', 
      imageUrl: 'https://i.postimg.cc/K871qGwZ/jaipur.jpg'
    },
    { 
      title: 'Goa', 
      description: 'Relax on the beautiful beaches and enjoy the vibrant nightlife.', 
      imageUrl: 'https://i.postimg.cc/8zk7YQSM/goa.jpg'
    },
    { 
      title: 'Kolkata', 
      description: 'Explore the cultural capital of India with its arts and cuisine.', 
      imageUrl: 'https://i.postimg.cc/76NvdcDJ/kolkata.jpg'
    },
    { 
      title: 'Chennai', 
      description: 'Enjoy the vibrant culture and beautiful beaches of South India.', 
      imageUrl: 'https://i.postimg.cc/WbzRYXyt/chennai.jpg'
    },
    { 
      title: 'Kodaikanal', 
      description: 'Experience the serene hill station known for its lakes and greenery.', 
      imageUrl: 'https://i.postimg.cc/pX6wwKNC/kodaikanal.jpg'
    },
  ];

  const navigate = useNavigate();

  const handleCardClick = async (destinationTitle) => {
    const token = localStorage.getItem('token');

    const params = { address: destinationTitle };
    console.log(params);

    try {
      const response = await axios.get('http://localhost:8081/api/user/searchHotelByAddress', {
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true, 
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="destinations">
      <Typography variant="h4" gutterBottom align="center" style={{fontWeight: 'bold', fontSize: '3.0rem',padding:'20px'}}>
        Explore by Destinations in India
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center"style={{ marginBottom: '30px',color: '#000', fontWeight: 'normal', fontSize: '2.0rem', marginTop: '10px'}}>
        Choose your dream destination and find the best hotels.
      </Typography>
      <Slider {...settings}>
        {destinations.map((destination, index) => (
          <div key={index} style={{ padding: '10px' }}>
            <div 
              style={{ 
                padding: '20px', 
                textAlign: 'center', 
                background: '#fff', 
                borderRadius: '10px', 
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
                cursor: 'pointer', 
                height: '350px' 
              }}
              onClick={() => handleCardClick(destination.title)}
            >
              <img 
                src={destination.imageUrl} 
                alt={destination.title} 
                style={{ 
                  width: '100%', 
                  height: '400px', 
                  borderRadius: '10px', 
                  objectFit: 'cover' 
                }} 
              />
              <Typography variant="h6" gutterBottom style={{ marginTop: '10px' }}>
                {destination.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
                {destination.description}
              </Typography>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ExploreByDestinations;
