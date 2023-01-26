import { Box, Button, Typography } from "@mui/material";
import React from "react";

const Banner = () => {
  return (
    <Box sx={{marginBottom: 8}}>
      <Typography variant="h3" color="primary" align="center" gutterBottom>
        IronWorks
      </Typography>
      <Typography variant="h6" align="center" color="HighlightText" gutterBottom>
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
