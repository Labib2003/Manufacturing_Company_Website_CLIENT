import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ tool }) => {
  // props
  const {
    _id,
    name,
    image,
    description,
    min_order_quantity,
    available_quantity,
    per_unit_price,
  } = tool;
  const navigate = useNavigate();

  const navigateToUpdate = (id) => {
    navigate(`/tools/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia component="img" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description.length > 100 ? description.slice(0, 100) + "..." : description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={navigateToUpdate} size="small" color="primary">
          Purchase
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
