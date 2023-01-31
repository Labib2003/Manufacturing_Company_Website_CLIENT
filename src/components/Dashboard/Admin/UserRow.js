import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserRow = ({ user, index, refetch }) => {
  const navigate = useNavigate();

  const makeAdmin = (email) => {
    fetch(
      `https://manufacturing-company-website-server.vercel.app/api/v1/users/admin/${email}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        toast.error("User promoted to admin");
        refetch();
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{user.email}</td>
      <td>
        {user?.isAdmin ? (
          <p className="text-lime-500">Admin</p>
        ) : (
          <p className="text-secondary">User</p>
        )}
      </td>
      <td>
        {user?.isAdmin ? (
          <p className="text-lime-500">Already Admin</p>
        ) : (
          <button
            onClick={() => makeAdmin(user.email)}
            className="btn btn-success"
          >
            Make Admin
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
