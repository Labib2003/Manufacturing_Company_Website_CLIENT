import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import FailedToFetch from "../../shared/FailedToFetch";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ConfirmDeleteProductModal from "./ConfirmDeleteProductModal";
import ProductRow from "./ProductRow";

const ManageProducts = () => {
  const [product, setProduct] = useState(null);

  const {
    isLoading,
    error,
    data: products,
    refetch,
  } = useQuery("products", () =>
    fetch(
      "https://manufacturing-company-website-server.vercel.app/api/v1/tools"
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
      <Typography variant="h4" color="primary" gutterBottom>
        All products
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Per Unit Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.data.map((product, index) => (
            <ProductRow
              key={product._id}
              product={product}
              index={index}
              setProduct={setProduct}
            ></ProductRow>
          ))}
        </TableBody>
      </Table>
      {product && (
        <ConfirmDeleteProductModal
          product={product}
          setProduct={setProduct}
          refetch={refetch}
        ></ConfirmDeleteProductModal>
      )}
    </Box>
  );
};

export default ManageProducts;
