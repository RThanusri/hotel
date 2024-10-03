import React from "react";
import ExploreByDestinations from "./ExploreByAddress";
import ExploreByAmenities from "./ExploreByAmenities";
import Search from "../Hotel/Search";
import { Box } from "@mui/material";
import FAQ from "./FAQ";

import OwnerNavBar from "../HotelOwner/OwnerNavBar/OwnerNavBar";
import Footer from "../Footer/Footer";

const OwnerHome = () => {
  return (
   
    <Box sx={{ p: 3}}> 
     <OwnerNavBar/>
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

export default OwnerHome;
