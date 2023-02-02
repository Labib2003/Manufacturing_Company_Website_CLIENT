import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FailedToFetch from "../components/shared/FailedToFetch";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const Purchase = () => {
  // getting the id from url
  const { id } = useParams();

  const phoneRef = useRef(0);
  const quantityRef = useRef(0);
  const addressRef = useRef("");

  // getting user from firebase
  const [user] = useAuthState(auth);

  // react query
  const {
    isLoading,
    error,
    data: tool,
    refetch,
  } = useQuery("purchaseTool", () =>
    fetch(
      `https://manufacturing-company-website-server.vercel.app/api/v1/tools/${id}`
    ).then((res) => res.json())
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <FailedToFetch />;
  }

  const handleOrder = (event) => {
    event.preventDefault();

    const order = {
      email: user.email,
      phone: phoneRef.current.children[1].children[0].value,
      address: addressRef.current.children[1].children[0].value,
      product_name: tool.data.name,
      quantity: quantityRef.current.children[0].children[0].valueAsNumber,
      per_unit_price: tool.data.per_unit_price,
      paid: false,
      transactionId: "",
    };

    const newQuantity =
      tool.data.available_quantity -
      quantityRef.current.children[0].children[0].valueAsNumber;

    fetch(
      "https://manufacturing-company-website-server.vercel.app/api/v1/orders",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(order),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);

        fetch(
          `https://manufacturing-company-website-server.vercel.app/api/v1/tools/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ available_quantity: newQuantity }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (!data.success) throw new Error(data.message);
            else {
              toast.success(
                "Order placed successfully. Check your dashboard to confirm your order and pay."
              );
              refetch();
            }
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const {
    name,
    description,
    per_unit_price,
    min_order_quantity,
    available_quantity,
  } = tool?.data;

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      divider={<Divider orientation="vertical" flexItem />}
      spacing={4}
    >
      <Box>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="body1" gutterBottom>
          {description}
        </Typography>
        <Typography variant="h6">Per Unit Price: ${per_unit_price}</Typography>
        <Typography variant="h6">
          Minimum Order Quantity: {min_order_quantity}
        </Typography>
        <Typography variant="h6">
          Available Quantity: {available_quantity}
        </Typography>
      </Box>
      <Box>
        <form onSubmit={handleOrder}>
          <TextField
            type="text"
            label="Name"
            value={user.displayName}
            margin="normal"
            fullWidth
            required
            readOnly
          />
          <TextField
            type="email"
            label="Email"
            value={user.email}
            margin="normal"
            fullWidth
            required
            readOnly
          />
          <TextField
            type="phone"
            label="Phone Number"
            margin="normal"
            fullWidth
            required
            ref={phoneRef}
          />
          <TextField
            type="address"
            label="Delivery address"
            margin="normal"
            fullWidth
            required
            ref={addressRef}
          />
          <TextField
            type="number"
            defaultValue={min_order_quantity}
            margin="normal"
            inputProps={{ min: min_order_quantity, max: available_quantity }}
            fullWidth
            required
            ref={quantityRef}
          />
          <Button type="submit" variant="contained">
            Place Order
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default Purchase;
