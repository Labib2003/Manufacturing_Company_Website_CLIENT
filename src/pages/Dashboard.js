import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { Link, Outlet } from "react-router-dom";
import FailedToFetch from "../components/shared/FailedToFetch";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Card, Drawer, List, ListItem } from "@mui/material";
import MaterialLink from "@mui/material/Link";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    isLoading,
    error,
    data: userFromDb,
  } = useQuery("userFromDb", () =>
    fetch(
      `https://manufacturing-company-website-server.vercel.app/api/v1/users/${user.email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          From: user.email,
        },
      }
    ).then((res) => res.json())
  );
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    return <FailedToFetch></FailedToFetch>;
  }

  return (
    <Box>
      <Drawer open={drawerOpen} onClick={() => setDrawerOpen(!drawerOpen)}>
        <List
          sx={{ padding: { xs: 0, sm: 2 }, paddingRight: { xs: 0, md: 16 } }}
        >
          <ListItem>
            <MaterialLink variant="h6" underline="hover">
              <Link to="/dashboard">My Profile</Link>
            </MaterialLink>
          </ListItem>
          {userFromDb.data.isAdmin ? (
            <>
              <ListItem>
                <MaterialLink variant="h6" underline="hover">
                  <Link to="/dashboard/manageAllOrders">Manage All Orders</Link>
                </MaterialLink>
              </ListItem>
              <ListItem>
                <MaterialLink variant="h6" underline="hover">
                  <Link to="/dashboard/addNewProduct">Add a Product</Link>
                </MaterialLink>
              </ListItem>
              <ListItem>
                <MaterialLink variant="h6" underline="hover">
                  <Link to="/dashboard/makeAdmin">Make Admin</Link>
                </MaterialLink>
              </ListItem>
              <ListItem>
                <MaterialLink variant="h6" underline="hover">
                  <Link to="/dashboard/manageProducts">Manage Products</Link>
                </MaterialLink>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem>
                <MaterialLink variant="h6" underline="hover">
                  <Link to="/dashboard/addReview">Add Review</Link>
                </MaterialLink>
              </ListItem>
              <ListItem>
                <MaterialLink variant="h6" underline="hover">
                  <Link to="/dashboard/myOrders">My Orders</Link>
                </MaterialLink>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
      <MenuIcon
        cursor="pointer"
        sx={{ marginBottom: 2, fontSize: "2rem" }}
        onClick={() => setDrawerOpen(!drawerOpen)}
      />
      <Card sx={{ padding: 4 }}>
        <Outlet />
      </Card>
    </Box>
  );
};

export default Dashboard;
