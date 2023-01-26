import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const CustomerReview = ({ review }) => {
  const { user, stars, body } = review;
  return (
    <Card sx={{ minWidth: 275, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h5" color="primary" gutterBottom>
          {new Array(stars).fill(0).map(elem => <StarIcon />)}
          {new Array(5 - stars).fill(0).map(elem => <StarBorderIcon />)}
        </Typography>
        <Typography variant="body1" color="GrayText">
          {`"${body}"`}
          <br />
          - {user}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomerReview;
