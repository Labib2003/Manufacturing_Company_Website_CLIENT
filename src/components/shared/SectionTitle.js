import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const SectionTitle = ({children}) => {
  return (
    <Box sx={{ marginBottom: 1 }}>
      <Divider />
      <Typography
        variant="h4"
        align="center"
        color="primary"
        sx={{ margin: ".5rem 0" }}
      >
        {children}
      </Typography>
      <Divider />
    </Box>
  );
};

export default SectionTitle;
