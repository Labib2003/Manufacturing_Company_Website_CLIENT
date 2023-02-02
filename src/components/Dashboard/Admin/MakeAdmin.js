import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import FailedToFetch from "../../shared/FailedToFetch";
import LoadingSpinner from "../../shared/LoadingSpinner";
import UserRow from "./UserRow";

const MakeAdmin = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const {
    isLoading,
    error,
    data: users,
    refetch,
  } = useQuery("users", () =>
    fetch(
      "https://manufacturing-company-website-server.vercel.app/api/v1/users",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
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
      <Typography variant="h4" color="primary" gutterBottom>
        All users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.data.map((user, index) => (
            <UserRow
              key={user._id}
              user={user}
              index={index}
              refetch={refetch}
            ></UserRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default MakeAdmin;
