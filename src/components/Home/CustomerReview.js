import React from "react";
import { Card, CardContent, Rating, Typography } from "@mui/material";

const CustomerReview = ({ review }) => {
  const { user, stars, body } = review;
  return (
    <Card sx={{ minWidth: 275, textAlign: "center" }}>
      <CardContent>
        <Rating readOnly value={stars} />
        <Typography variant="body1" color="GrayText">
          {`"${body}"`}
          <br />- {user}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomerReview;
