import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

import auth from "../../../firebase.init";
import useToken from "../../../hooks/useToken";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { async } from "@firebase/util";

const Login = () => {
  // react firebase hooks
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    );
  };

  // getting jwt
  const [token] = useToken(user || googleUser);

  // navigate to previous page
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  // password reset email
  const handleSendResetEmail = async () => {
    const email = emailRef.current.value;
    await sendPasswordResetEmail(email);
    toast.success("Password Reset Email Sent!");
  };

  return (
    <Stack direction="row" justifyContent="center">
      <Card sx={{ width: "50%" }}>
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom>
            Login
          </Typography>
          <form onSubmit={(e) => handleLogin(e)} autoComplete="off">
            <Stack spacing={2} marginBottom={2}>
              <TextField
                type="email"
                label="Email"
                inputRef={emailRef}
                required
              />
              <TextField
                type="password"
                label="Password"
                inputRef={passwordRef}
                required
              />
              <Button variant="contained" type="submit" size="large">
                Login
              </Button>
            </Stack>
          </form>
          <Typography variant="body1" align="center" marginTop={2} gutterBottom>
            Forgot password? &nbsp;
            <span
              className="text-secondary cursor-pointer"
              onClick={handleSendResetEmail}
            >
              Send password reset email
            </span>
          </Typography>
          <Typography align="center" variant="body1" gutterBottom>
            New to our site?{" "}
            <Link className="text-secondary" to="/register">
              Create New Account
            </Link>
          </Typography>
          <Divider />
          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={() => signInWithGoogle()}
          >
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Login;
