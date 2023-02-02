import React, { useState } from "react";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import FailedToFetch from "../../shared/FailedToFetch";
import LoadingSpinner from "../../shared/LoadingSpinner";
import DeleteConfirmModal from "./DeleteConfirmModal";
import OrdersRow from "./OrdersRow";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const email = user.email;
  const [order, setOrder] = useState(null);

  const {
    isLoading,
    error,
    data: orders,
    refetch,
  } = useQuery("orders", () =>
    fetch(
      `https://manufacturing-company-website-server.vercel.app/api/v1/orders/byEmail/${email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => res.json())
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <FailedToFetch />;
  }

  return (
    <Box>
      <Typography variant="h4" color="primary">
        Your orders
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell align="center">Payment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.data?.map((order, index) => (
            <OrdersRow
              key={order._id}
              order={order}
              index={index}
              setOrder={setOrder}
            ></OrdersRow>
          ))}
        </TableBody>
      </Table>
      {order && (
        <DeleteConfirmModal
          order={order}
          setOrder={setOrder}
          refetch={refetch}
        ></DeleteConfirmModal>
      )}
    </Box>
  );
};

export default MyOrders;
