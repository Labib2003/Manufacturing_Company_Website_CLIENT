import { Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { success } from "daisyui/src/colors";
import { signOut } from "firebase/auth";
import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const MyProfile = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const phoneRef = useRef(0);
  const addressRef = useRef("");

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const updatedProfile = {
      name: user.displayName,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
    };

    fetch(
      `https://manufacturing-company-website-server.vercel.app/api/v1/users/${user.email}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(updatedProfile),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        toast.success("Profile updated successfully");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <Box>
      <form onSubmit={handleUpdateProfile}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h4" color="primary">
            Your Profile
          </Typography>
          <TextField
            type="text"
            label="Name"
            value={user.displayName}
            readOnly
          />
          <TextField type="email" label="Email" value={user.email} readOnly />
          <TextField type="tel" label="Phone" inputRef={phoneRef} />
          <TextField type="address" label="Address" inputRef={addressRef} />
          <Button type="submit" variant="contained" size="large">
            Update Profile
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default MyProfile;
