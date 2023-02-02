import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import FailedToFetch from "../../shared/FailedToFetch";
import LoadingSpinner from "../../shared/LoadingSpinner";
import AllOrdersRow from "./AllOrdersRow";

const ManageAllOrders = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const {
    isLoading,
    error,
    data: allOrders,
    refetch,
  } = useQuery("allOrders", () =>
    fetch(
      "https://manufacturing-company-website-server.vercel.app/api/v1/orders",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => {
      return res.json();
    })
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <FailedToFetch />;
  }
  return (
    <Box>
      <Typography variant="h4" color="primary" gutterBottom>
        Manage all orders
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>CLient</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Shipping</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders.data.map((order, index) => (
            <AllOrdersRow
              key={order._id}
              order={order}
              index={index}
              refetch={refetch}
            ></AllOrdersRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ManageAllOrders;
