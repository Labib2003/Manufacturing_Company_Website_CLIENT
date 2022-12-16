import { signOut } from "firebase/auth";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../../firebase.init";

const AddNewProduct = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  // for image upload
  const [image, setImage] = useState(null);

  // user inputs
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const availableRef = useRef(0);
  const minRef = useRef(0);
  const priceRef = useRef(0);

  // imagebb key
  const imageUploadKey = "5a4eb1ee63d962e1a439c22cbda3f289";

  const handleAddNewProduct = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    fetch(`https://api.imgbb.com/1/upload?key=${imageUploadKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          const img = data.data.url;
          const newProduct = {
            name: nameRef.current.value,
            image: img,
            description: descriptionRef.current.value,
            min_order_quantity: minRef.current.value,
            available_quantity: availableRef.current.value,
            per_unit_price: priceRef.current.value,
          };
          fetch(`https://ironworks-backend.onrender.com/tools`, {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              From: user.email,
            },
            body: JSON.stringify(newProduct),
          })
            .then((res) => {
              if (res.status !== 200) {
                signOut(auth);
                localStorage.removeItem("accessToken");
                navigate("/login");
                return toast.error(`Error ${res.status}`);
              }
              toast.success("Item successfully added!");
              navigate("/");
              return res.json();
            })
            .then((data) => console.log(data));
        }
      });
  };

  return (
    <div>
      <div className="card bg-base-200 shadow-2xl">
        <div className="card-body">
          <h1 className="card-title text-3xl font-bold">Enter Product Info</h1>
          <form
            onSubmit={handleAddNewProduct}
            className="w-full"
            autoComplete="off"
          >
            <div className="form-control mb-5">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                ref={nameRef}
                placeholder="Enter product name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mb-5">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                ref={descriptionRef}
                placeholder="Enter a short description of the product"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mb-5">
              <label className="label">
                <span className="label-text">Available Quantity</span>
              </label>
              <input
                type="number"
                min="0"
                ref={availableRef}
                placeholder="Enter available quantity"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mb-5">
              <label className="label">
                <span className="label-text">Minimum order quantity</span>
              </label>
              <input
                type="number"
                min="0"
                ref={minRef}
                placeholder="Enter minimum order quantity"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mb-5">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                ref={priceRef}
                placeholder="Enter per unit price"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control w-full mb-5">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                required
              />
            </div>
            <input
              className="btn btn-secondary w-full text-white"
              type="submit"
              value="Add Item"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
