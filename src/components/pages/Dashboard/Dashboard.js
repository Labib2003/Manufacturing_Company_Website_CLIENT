import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import FailedToFetch from "../../shared/FailedToFetch";
import LoadingSpinner from "../../shared/LoadingSpinner";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: userFromDb,
  } = useQuery("userFromDb", () =>
    fetch(`https://ironworks-backend.onrender.com/user/${user.email}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        From: user.email,
      },
    }).then((res) => {
      if (res.status !== 200) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/login");
        return toast.error(`Error ${res.status}`);
      }
      return res.json();
    })
  );
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    return <FailedToFetch></FailedToFetch>;
  }
  return (
    <div>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-secondary drawer-button lg:hidden mb-5"
          >
            Open drawer
          </label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-52 text-base-content">
            {userFromDb.admin ? (
              <>
                <li>
                  <Link to="/dashboard">My Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard/manageAllOrders">Manage All Orders</Link>
                </li>
                <li>
                  <Link to="/dashboard/addNewProduct">Add a Product</Link>
                </li>
                <li>
                  <Link to="/dashboard/makeAdmin">Make Admin</Link>
                </li>
                <li>
                  <Link to="/dashboard/manageProducts">Manage Products</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard">My Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard/addReview">Add Review</Link>
                </li>
                <li>
                  <Link to="/dashboard/myOrders">My Orders</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
