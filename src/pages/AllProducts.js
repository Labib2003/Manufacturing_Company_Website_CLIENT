import React from "react";
import { useQuery } from "react-query";
import ProductCard from "../components/shared/ProductCard";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import FailedToFetch from "../components/shared/FailedToFetch";
import { Box, Typography } from "@mui/material";
import SectionTitle from "../components/shared/SectionTitle";

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
    return <LoadingSpinner />;
  }
  if (error) {
    return <FailedToFetch />;
  }

  return (
    <Box>
      <SectionTitle>Our Products</SectionTitle>
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
