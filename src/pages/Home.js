import { Box } from "@mui/material";
import React from "react";
import Banner from "../components/pages/Home/Banner";
import BusinessSummary from "../components/pages/Home/BusinessSummary";
import ContactUs from "../components/pages/Home/ContactUs";
import CustomerReviews from "../components/pages/Home/CustomerReviews";
import Map from "../components/pages/Home/Map";
import NewsLetter from "../components/pages/Home/NewsLetter";
import Tools from "../components/pages/Home/Tools";

const Home = () => {
  return (
    <Box>
      <Banner />
      <Tools />
      <BusinessSummary />
      <Map />
      <CustomerReviews />
      <div id="contact" className="flex flex-col md:flex-row md:justify-around">
        <div className="my-auto">
          <ContactUs></ContactUs>
        </div>
        <div className="">
          <NewsLetter></NewsLetter>
        </div>
      </div>
    </Box>
  );
};

export default Home;
