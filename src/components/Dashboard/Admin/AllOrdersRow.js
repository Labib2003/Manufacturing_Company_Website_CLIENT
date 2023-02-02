import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";

const AllOrdersRow = ({ order, index, refetch }) => {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const { _id, product_name, email, quantity, paid, shipped } = order;

  const handleShipping = (id) => {
    fetch(
      `https://manufacturing-company-website-server.vercel.app/api/v1/orders/ship/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          From: user.email,
        },
      }
    )
      .then((res) => {
        toast.success("Order is on the way to the customer.");
        return res.json();
      })
      .then((data) => refetch());
  };

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{product_name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>
        {paid ? (
          <Typography variant="body1" color="lime">
            Paid
          </Typography>
        ) : (
          <Typography variant="body1" color="red">
            Payment Pending
          </Typography>
        )}
      </TableCell>
      <TableCell>
        {paid ? (
          shipped ? (
            <Typography variant="body1" color="lime">
              Shipped
            </Typography>
          ) : (
            <Button
              variant="contained"
              color="info"
              onClick={() => handleShipping(_id)}
            >
              Ship
            </Button>
          )
        ) : (
          <Typography variant="body1" color="red">
            Waiting for payment
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
};

export default AllOrdersRow;
