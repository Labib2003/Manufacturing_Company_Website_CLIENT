import {
  Backdrop,
  Button,
  Fade,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";

const DeleteConfirmModal = ({ order, refetch, setOrder }) => {
  const { product_name, quantity, _id } = order;
  console.log(order);
  const navigate = useNavigate();
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
    setOrder(null);
    fetch(
      `https://manufacturing-company-website-server.vercel.app/api/v1/orders/${id}`,
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
        toast.success("Order cancelled successfully");
        refetch();
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={order}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={order}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6">
            Are you sure you want to cancel your {product_name} order?
          </Typography>
          <Typography id="transition-modal-description" gutterBottom>
            Quantity: {quantity}
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
              onClick={() => setOrder(null)}
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

export default DeleteConfirmModal;
