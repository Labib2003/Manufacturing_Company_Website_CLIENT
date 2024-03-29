import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, TableCell, TableRow } from "@mui/material";

const OrdersRow = ({ order, index, setOrder }) => {
  const { product_name, quantity, per_unit_price, transactionId, _id } = order;
  const totalPrice = parseInt(quantity) * parseInt(per_unit_price);
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{product_name}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>${totalPrice}</TableCell>
      <TableCell>{transactionId ? "Paid" : "Pending"}</TableCell>
      <TableCell className="w-1/3">
        {transactionId ? (
          <p className="text-lime-500">TransactionId: {transactionId}</p>
        ) : (
          <Stack direction="row" justifyContent="space-around">
            <Button variant="contained" color="info">
              <Link to={`/dashboard/payment/${_id}`}>Pay</Link>
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setOrder(order)}
            >
              Cancel
            </Button>
          </Stack>
        )}
      </TableCell>
    </TableRow>
  );
};

export default OrdersRow;
