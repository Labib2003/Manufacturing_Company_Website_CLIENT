import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useQuery } from "react-query";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import FailedToFetch from "../components/shared/FailedToFetch";
import auth from "../firebase.init";

const RequireAdmin = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

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
    ).then((res) => {
      /* if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/login");
      } */
      return res.json();
    })
  );
  if (loading || isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    return <FailedToFetch></FailedToFetch>;
  }

  const admin = userFromDb?.data.isAdmin;

  if (!user || !admin) {
    signOut(auth);
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default RequireAdmin;
