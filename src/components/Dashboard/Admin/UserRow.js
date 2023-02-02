import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserRow = ({ user, index, refetch }) => {
  const navigate = useNavigate();

  const makeAdmin = (email) => {
    fetch(
      `https://manufacturing-company-website-server.vercel.app/api/v1/users/admin/${email}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        toast.error("User promoted to admin");
        refetch();
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        {user?.isAdmin ? (
          <Typography variant="body1" color="lime">
            Admin
          </Typography>
        ) : (
          <Typography variant="body1" color="primary">
            User
          </Typography>
        )}
      </TableCell>
      <TableCell>
        {user?.isAdmin ? (
          <Typography variant="body1" color="lime">
            Already Admin
          </Typography>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={() => makeAdmin(user.email)}
          >
            Make Admin
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
