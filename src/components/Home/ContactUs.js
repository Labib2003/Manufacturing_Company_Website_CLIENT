import React from "react";
import SectionTitle from "../shared/SectionTitle";
import { Box, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const contacts = [
  {
    icon: <EmailIcon />,
    text: "labib.salimi30@gmail.com",
  },
  {
    icon: <LocationOnIcon />,
    text: "Dhaka, Bangladesh",
  },
  {
    icon: <PhoneIcon />,
    text: "+880-987654320",
  },
];

const ContactUs = () => {
  return (
    <Box>
      <SectionTitle>Contact Us</SectionTitle>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {xs: "repeat(1, 1fr)", md:"repeat(3, 1fr)" },
          placeItems: "center",
          marginTop: 1,
        }}
      >
        {contacts.map((contact) => (
          <Typography variant="h6" gutterBottom>
            {contact.icon} {contact.text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default ContactUs;
