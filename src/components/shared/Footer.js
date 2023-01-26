import React from "react";
import { Box } from "@mui/system";
import { BottomNavigation, Card, Typography } from "@mui/material";
import HandymanIcon from "@mui/icons-material/Handyman";

const Footer = () => {
  return (
    <Card sx={{ marginTop: 8, padding: 2 }}>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
        }}
      >
        <HandymanIcon />
        &nbsp;IronWorks &copy; {new Date().getFullYear()}
      </Typography>
    </Card>
  );
};

export default Footer;
