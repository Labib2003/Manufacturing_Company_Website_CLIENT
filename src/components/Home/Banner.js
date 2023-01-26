import React from "react";
import { Box, Button, Typography } from "@mui/material";
import HandymanIcon from "@mui/icons-material/Handyman";

const Banner = () => {
  return (
    <Box sx={{ marginBottom: 8 }}>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
        }}
        color="primary"
        gutterBottom
      >
        <HandymanIcon sx={{ fontSize: "3rem" }} />
        <br />
        IronWorks
      </Typography>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
      >
        IronWorks is one of the largest manufacturers of professional hand tools
        in the South Asian region, serving the woodworking, vehicle service and
        assembly, electronics, construction and DIY markets.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{ display: "block", margin: "0 auto", width: "fit-content" }}
        href="#business"
      >
        Learn More
      </Button>
    </Box>
  );
};

export default Banner;
