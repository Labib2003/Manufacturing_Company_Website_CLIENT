import { Backdrop, Box, Button, Fade, Modal, Stack, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";

const ConfirmDeleteProductModal = ({ product, refetch, setProduct }) => {
  const navigate = useNavigate();
  const { _id, name } = product;

  const [user] = useAuthState(auth);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleDelete = (id) => {
    setProduct(null);
    fetch(
      `https://manufacturing-company-website-server.vercel.app/api/v1/tools/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        toast.success("Item deleted successfully");
        refetch();
      })
      .catch((error) => toast.error(error.message));
  };
  
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={product}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={product}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6">
            Are you sure you want to remove {product.name}?
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="contained"
              onClick={() => handleDelete(_id)}
              color="warning"
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              onClick={() => setProduct(null)}
              color="info"
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmDeleteProductModal;
