import React from "react";
import ExploreByDestinations from "./ExploreByAddress";
import ExploreByAmenities from "./ExploreByAmenities";
import Search from "../Hotel/Search";
import { Box } from "@mui/material";
import FAQ from "./FAQ";
import UserNavbar from "../User/UserNavBar";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
   
    <Box sx={{ p: 3}}> 
     <UserNavbar/>
      <Box sx={{ mb: 5 }}> 
        <Search />
      </Box>
      
      <Box sx={{ mb: 5 }}>
        <ExploreByDestinations />
      </Box>
      <Box > 
        <ExploreByAmenities />
      </Box>
      <Box > 
        <FAQ />
      </Box>
    <Footer/>
    </Box>
  );
};

export default Home;
