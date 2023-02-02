import { TableCell, TableRow } from "@mui/material";
import React from "react";

const ProductRow = ({ product, index, setProduct }) => {
  const { name, available_quantity, per_unit_price } = product;

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{available_quantity}</TableCell>
      <TableCell>{per_unit_price}</TableCell>
      <TableCell>
        <label
          onClick={() => setProduct(product)}
          htmlFor="delete-product"
          className="btn btn-warning modal-button"
        >
          Delete
        </label>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
