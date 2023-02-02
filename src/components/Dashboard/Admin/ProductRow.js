import React from "react";
import { Button, TableCell, TableRow } from "@mui/material";

const ProductRow = ({ product, index, setProduct }) => {
  const { name, available_quantity, per_unit_price } = product;

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{available_quantity}</TableCell>
      <TableCell>{per_unit_price}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setProduct(product)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
