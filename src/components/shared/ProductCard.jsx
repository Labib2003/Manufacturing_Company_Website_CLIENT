import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ProductCard = ({ tool }) => {
  // props
  const { _id, name, image, description } = tool;
  const navigate = useNavigate();

  const navigateToUpdate = () => {
    navigate(`/tools/${_id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <CardMedia component="img" image={image} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </Typography>
        </CardContent>
      </Box>
      <CardActions>
        <Button onClick={navigateToUpdate} size="small" color="primary">
          Purchase
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
