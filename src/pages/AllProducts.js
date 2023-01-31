import React from "react";
import { useQuery } from "react-query";
import ProductCard from "../components/shared/ProductCard";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import FailedToFetch from "../components/shared/FailedToFetch";
import { Box, Grid } from "@mui/material";
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
      <Grid container spacing={4}>
        {tools.data.map((tool) => (
          <Grid item key={tool.key} xs={12} sm={6} md={4}>
            <ProductCard tool={tool} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllProducts;
