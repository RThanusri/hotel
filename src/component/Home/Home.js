import React from "react";
import ExploreByDestinations from "./ExploreByAddress";
import ExploreByAmenities from "./ExploreByAmenities";
import Search from "../Hotel/Search";
import { Box } from "@mui/material";
import FAQ from "./FAQ";

const Home = () => {
  return (
    <Box sx={{ p: 3}}> 
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
    
    </Box>
  );
};

export default Home;
