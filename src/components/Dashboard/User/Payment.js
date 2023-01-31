import { Box, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import FailedToFetch from "../../shared/FailedToFetch";
import LoadingSpinner from "../../shared/LoadingSpinner";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L0hSZCsqEIAHtmewln439tN1kcj7zFfi8DLN9NpThjN9dTLGGeheAj6yNaOGpBbodw14i2XgAYPQuVCsxVUQSIS007hYq6fD4"
);

const Payment = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, error, data } = useQuery(["payment", id], () =>
    fetch(
      `https://manufacturing-company-website-server.vercel.app/api/v1/orders/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          From: user.email,
        },
      }
    ).then((res) => res.json())
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    console.log();
    return <FailedToFetch />;
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={4}
    >
      <Box width="50%">
        <div className="card-body">
          <Typography variant="h4" color="primary">
            Please pay for your <strong>{data?.data?.product_name}</strong> order
          </Typography>
          <Typography variant="body1">
            Order Quantity: {data?.data?.quantity}
          </Typography>
          <Typography variant="body1">
            Per Unit price: ${data?.data?.per_unit_price}
          </Typography>
          <Typography variant="body1">
            Total price: ${data?.data?.quantity * data?.data?.per_unit_price}
          </Typography>
        </div>
      </Box>
      <Box width="50%" bgcolor="#1A2027" padding="1rem" borderRadius={1}>
          <Elements stripe={stripePromise}>
            <CheckoutForm order={data?.data} />
          </Elements>
      </Box>
    </Stack>
  );
};

export default Payment;
