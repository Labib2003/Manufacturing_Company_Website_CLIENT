import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import FailedToFetch from "../../shared/FailedToFetch";
import LoadingSpinner from "../../shared/LoadingSpinner";
import CustomerReview from "./CustomerReview";

const CustomerReviews = () => {
  const {
    isLoading,
    error,
    data: reviews,
  } = useQuery("reviews", () =>
    fetch(
      "https://manufacturing-company-website-server.vercel.app/api/v1/reviews",
      {
        method: "GET",
      }
    ).then((res) => res.json())
  );
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    return <FailedToFetch></FailedToFetch>;
  }

  return (
    <Box sx={{ marginBottom: 8 }}>
      <Divider />
      <Typography
        variant="h4"
        align="center"
        color="primary"
        sx={{ margin: ".5rem 0" }}
      >
        Customer Reviews
      </Typography>
      <Divider />
      <Box
        sx={{
          marginTop: 1,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 4,
        }}
      >
        {reviews.data.map((review) => (
          <CustomerReview key={review._id} review={review}></CustomerReview>
        ))}
      </Box>
    </Box>
  );
};

export default CustomerReviews;
