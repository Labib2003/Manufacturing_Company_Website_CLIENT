import React, { useRef } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const AddReview = () => {
  const [user] = useAuthState(auth);
  const [ratingValue, setRatingValue] = useState(0);
  const reviewRef = useRef("");

  const handleSubmitReview = (event) => {
    event.preventDefault();
    const review = {
      user: user.displayName,
      email: user.email,
      stars: ratingValue,
      body: reviewRef.current.value,
    };
    fetch(
      "https://manufacturing-company-website-server.vercel.app/api/v1/reviews",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(review),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message);
        }
        toast.success(
          "Review posted successfully. Thank you for your feedback."
        );
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <Box>
      <form onSubmit={handleSubmitReview}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h4" color="primary">
            Please rate our service
          </Typography>
          <TextField
            type="text"
            label="Name"
            value={user.displayName}
            readOnly
            required
          />
          <TextField
            type="email"
            label="Email"
            value={user.email}
            readOnly
            required
          />
          <Box>
            <Typography component="legend" gutterBottom>
              Stars
            </Typography>
            <Rating
              name="simple-controlled"
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
            />
          </Box>
          <TextField type="text" label="Review" inputRef={reviewRef} required />
          <Button variant="contained" type="submit">
            Add Review
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddReview;
