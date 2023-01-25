import { Box, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import FailedToFetch from "../../shared/FailedToFetch";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ProductCard from "../../shared/ProductCard";

const AllProducts = () => {
  const {
    isLoading,
    error,
    data: tools,
  } = useQuery("tools", () =>
    fetch(
      "https://manufacturing-company-website-server.vercel.app/api/v1/tools"
    ).then((res) => res.json())
  );
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    return <FailedToFetch></FailedToFetch>;
  }
  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        All Products
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 4,
          placeItems: "center",
          marginBottom: 2,
        }}
      >
        {tools.data.map((tool) => (
          <ProductCard key={tool.key} tool={tool} />
        ))}
      </Box>
    </Box>
  );
};

export default AllProducts;
