import { Box, Divider, Typography } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import React from "react";

const BusinessSummary = () => {
  return (
    <Box id="business" sx={{marginBottom: 8}}>
      <Divider />
      <Typography variant="h4" align="center" color="primary" sx={{ margin: ".5rem 0" }}>
        Why should you choose us?
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(3, 1fr)" },
          marginTop: 2,
          marginBottom: 4,
        }}
      >
        <Box>
          <PublicIcon
            sx={{
              fontSize: 100,
              display: "block",
              margin: "0 auto",
              marginBottom: 1,
            }}
          />
          <Typography variant="h3" align="center">
            5
          </Typography>
          <Typography variant="h5" align="center">
            Regional Offices
          </Typography>
        </Box>
        <Box>
          <BusinessIcon
            sx={{
              fontSize: 100,
              display: "block",
              margin: "0 auto",
              marginBottom: 1,
            }}
          />
          <Typography variant="h3" align="center">
            137
          </Typography>
          <Typography variant="h5" align="center">
            Dealers Across the Globe
          </Typography>
        </Box>
        <Box>
          <GroupsIcon
            sx={{
              fontSize: 100,
              display: "block",
              margin: "0 auto",
              marginBottom: 1,
            }}
          />
          <Typography variant="h3" align="center">
            200K+
          </Typography>
          <Typography variant="h5" align="center">
            Happy Clients
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BusinessSummary;
