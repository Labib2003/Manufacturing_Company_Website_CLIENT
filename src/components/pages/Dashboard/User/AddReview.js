import { signOut } from "firebase/auth";
import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../../firebase.init";

const AddReview = () => {
  // getting user info
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // user input
  const starsRef = useRef(0);
  const reviewRef = useRef("");

  // posting new review
  const handleSubmitReview = (event) => {
    event.preventDefault();
    const review = {
      user: user.displayName,
      email: user.email,
      stars: starsRef.current.valueAsNumber,
      body: reviewRef.current.value,
    };
    fetch("https://ironworks-backend.onrender.com/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message);
        }
        toast.success(
          "Review posted successfully. Thank you for your feedback."
        );
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <div className="card shadow-xl">
      <form onSubmit={handleSubmitReview} className="card-body">
        <h1 className="text-3xl font-bold">
          Please let us know your experience with us.
        </h1>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            value={user.displayName}
            className="input input-bordered w-full"
            readOnly
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            value={user.email}
            className="input input-bordered w-full"
            readOnly
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Rating (Out of 5)</span>
          </label>
          <input
            type="number"
            min="0"
            max="5"
            ref={starsRef}
            placeholder="Enter your rating here."
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="">
          <label className="label">
            <span className="label-text">Review</span>
          </label>
          <input
            type="text"
            ref={reviewRef}
            placeholder="Enter your review here."
            className="input input-bordered w-full"
            required
          />
        </div>
        <input
          type="submit"
          className="btn btn-secondary mt-5 w-full max-w-xs mx-auto"
        />
      </form>
    </div>
  );
};

export default AddReview;
