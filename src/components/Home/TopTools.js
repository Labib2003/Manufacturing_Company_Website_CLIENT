import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import FailedToFetch from "../shared/FailedToFetch";
import LoadingSpinner from "../shared/LoadingSpinner";
import SectionTitle from "../shared/SectionTitle";
import ProductCard from "../shared/ProductCard";
import { Box, Button, Grid } from "@mui/material";

const TopTools = () => {
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

  const firstThree = tools.data.slice(0, 3);

  return (
    <Box sx={{ marginBottom: 8 }}>
      <SectionTitle title="Our Top Products">Out Top Products</SectionTitle>
      <Grid container spacing={4} marginBottom={2}>
        {firstThree.map((tool) => (
          <Grid item key={tool._id} xs={12} sm={6} md={4}>
            <ProductCard tool={tool} />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        sx={{ display: "block", margin: "0 auto" }}
        size="large"
      >
        <Link to="/all-products">All Products</Link>
      </Button>
    </Box>
  );
};

export default TopTools;
