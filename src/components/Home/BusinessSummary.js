import React from "react";
import SectionTitle from "../shared/SectionTitle";
import { Box, Typography } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";

const points = [
  {
    icon: (
      <PublicIcon
        sx={{
          fontSize: 100,
          display: "block",
          margin: "0 auto",
          marginBottom: 1,
        }}
      />
    ),
    number: "5",
    point: "Regional Offices",
  },
  {
    icon: (
      <BusinessIcon
        sx={{
          fontSize: 100,
          display: "block",
          margin: "0 auto",
          marginBottom: 1,
        }}
      />
    ),
    number: "137",
    point: "Dealers Across the Globe",
  },
  {
    icon: (
      <GroupsIcon
        sx={{
          fontSize: 100,
          display: "block",
          margin: "0 auto",
          marginBottom: 1,
        }}
      />
    ),
    number: "200k+",
    point: "Happy Clients",
  },
];

const BusinessSummary = () => {
  return (
    <Box id="business" sx={{ marginBottom: 8 }}>
      <SectionTitle>Why Should You Choose Us</SectionTitle>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(3, 1fr)" },
          marginBottom: 4,
        }}
      >
        {points.map((point) => (
          <Box>
            {point.icon}
            <Typography variant="h3" align="center">
              {point.number}
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
              {point.point}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BusinessSummary;
