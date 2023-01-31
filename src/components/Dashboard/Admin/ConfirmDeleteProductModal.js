import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";

const ConfirmDeleteProductModal = ({ product, refetch, setProduct }) => {
  const navigate = useNavigate();
  const { _id, name } = product;

  const [user] = useAuthState(auth);

  const handleDelete = (id) => {
    setProduct(null);
    fetch(
      `https://manufacturing-company-website-server.vercel.app/api/v1/tools/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        toast.success("Item deleted successfully");
        refetch();
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div>
      <input type="checkbox" id="delete-product" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <h3 className="text-lg font-bold mb-10">
            Are you sure you want to delete {name}?
          </h3>
          <div className="flex justify-around">
            <button className="btn btn-error" onClick={() => handleDelete(_id)}>
              Delete
            </button>
            <label htmlFor="delete-product" className="btn btn-success">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteProductModal;
