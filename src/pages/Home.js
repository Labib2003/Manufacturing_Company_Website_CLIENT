import React from "react";
import Banner from "../components/Home/Banner";
import TopTools from "../components/Home/TopTools";
import BusinessSummary from "../components/Home/BusinessSummary";
import Map from "../components/Home/Map";
import CustomerReviews from "../components/Home/CustomerReviews";
import ContactUs from "../components/Home/ContactUs";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Banner />
      <TopTools />
      <BusinessSummary />
      <Map />
      <CustomerReviews />
      <ContactUs />
    </Box>
  );
};

export default Home;
