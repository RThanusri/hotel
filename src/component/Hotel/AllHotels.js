import  { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllHotels = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHotels = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:8080/api/user/getAllHotels', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        navigate('/hotelListings', { 
          state: {
            hotels: response.data,
          }
        });
      } catch (error) {
        console.error("Error fetching hotels:", error);
        alert("Error fetching hotels. Please try again later.");
      }
    };

    fetchAllHotels();
  }, [navigate]); 

  return null; 
};

export default AllHotels;
