import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../../firebase.init";

const DeleteConfirmModal = ({ order, refetch, setOrder }) => {
  const { name, quantity, _id } = order;
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleDelete = (id) => {
    setOrder(null);
    fetch(`https://ironworks-backend.onrender.com/api/v1/orders/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        toast.success("Order cancelled successfully");
        refetch();
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div>
      <input type="checkbox" id="deleteModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <h3 className="text-lg font-bold mb-5">
            Cancel your <span className="text-error">{name}</span> order?
          </h3>
          <p className="mb-5">You ordered {quantity} pieces of this product.</p>
          <div className="flex justify-between">
            <button onClick={() => handleDelete(_id)} className="btn btn-error">
              Confirm
            </button>
            <label htmlFor="deleteModal" className="btn btn-warning">
              Go back
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
