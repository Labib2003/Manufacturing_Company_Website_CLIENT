import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../../firebase.init";
import FailedToFetch from "../../../shared/FailedToFetch";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L0hSZCsqEIAHtmewln439tN1kcj7zFfi8DLN9NpThjN9dTLGGeheAj6yNaOGpBbodw14i2XgAYPQuVCsxVUQSIS007hYq6fD4"
);

const Payment = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: order,
  } = useQuery(["payment", id], () =>
    fetch(
      `https://manufacturing-company-website-server.vercel.app/api/v1/orders/${id}`,
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
    console.log();
    return <FailedToFetch></FailedToFetch>;
  }
  return (
    <div>
      <div className="card shadow-xl mb-10">
        <div className="card-body">
          <p className="text-3xl font-bold mb-5">
            Please pay for your {order?.data.product_name} order
          </p>
          <p className="text-xl mb-3">Order Quantity: {order.data.quantity}</p>
          <p className="text-xl mb-3">
            Per Unit price: ${order.data.per_unit_price}
          </p>
          <p className="text-xl mb-3">
            Total price: ${order.data.quantity * order.data.per_unit_price}
          </p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm order={order.data} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
