import { Box, Button, Card, Input, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { signOut } from "firebase/auth";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";

const AddNewProduct = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  // for image upload
  const [image, setImage] = useState(null);

  // user inputs
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const availableRef = useRef(0);
  const minRef = useRef(0);
  const priceRef = useRef(0);

  // imagebb key
  const imageUploadKey = "5a4eb1ee63d962e1a439c22cbda3f289";

  const handleAddNewProduct = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    fetch(`https://api.imgbb.com/1/upload?key=${imageUploadKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const img = data.data.thumb.url;
          const newProduct = {
            name: nameRef.current.value,
            image: img,
            description: descriptionRef.current.value,
            min_order_quantity: minRef.current.value,
            available_quantity: availableRef.current.value,
            per_unit_price: priceRef.current.value,
          };
          fetch(
            `https://manufacturing-company-website-server.vercel.app/api/v1/tools`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify(newProduct),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (!data.success) throw new Error(data.message);
              toast.success("Item added successfully");
              navigate("/");
            })
            .catch((error) => toast.error(error.message));
        }
      });
  };

  return (
    <Box>
      <Typography variant="h4" color="primary" gutterBottom>
        Enter Product Info
      </Typography>
      <form
        onSubmit={handleAddNewProduct}
        className="w-full"
        autoComplete="off"
      >
        <Stack spacing={2}>
          <TextField
            type="text"
            label="Product Name"
            inputRef={nameRef}
            required
          />
          <TextField
            type="text"
            label="Product Description"
            inputRef={descriptionRef}
            required
          />
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="Available Quantity"
            inputRef={availableRef}
            required
          />
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="Minimum Order Quantity"
            inputRef={minRef}
            required
          />
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="Per Unit Price"
            inputRef={priceRef}
            required
          />
          <Box>
            <Typography variant="body2">Photo</Typography>
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              required
            />
          </Box>
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddNewProduct;
