import React from "react";
import { Card, Typography } from "@mui/material";
import HandymanIcon from "@mui/icons-material/Handyman";

const Footer = () => {
  return (
    <Card sx={{ marginTop: "auto", padding: 2, backgroundColor: "primary" }}>
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
