import React from "react";
import { Link } from "react-router-dom";

const OrdersRow = ({ order, index, setOrder }) => {
  const { product_name, quantity, per_unit_price, transactionId, _id } = order;
  const totalPrice = parseInt(quantity) * parseInt(per_unit_price);
  return (
    <tr className="text-xl">
      <td>{index + 1}</td>
      <td>{product_name}</td>
      <td>{quantity}</td>
      <td>${totalPrice}</td>
      <td>{transactionId ? "Paid" : "Pending"}</td>
      <td className="w-1/3">
        {transactionId ? (
          <p className="text-lime-500">TransactionId: {transactionId}</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 place-content-center">
            <Link to={`/dashboard/payment/${_id}`} className="btn btn-success">
              Pay
            </Link>
            <label
              htmlFor="deleteModal"
              className="btn modal-button btn-error"
              onClick={() => setOrder(order)}
            >
              Cancel
            </label>
          </div>
        )}
      </td>
    </tr>
  );
};

export default OrdersRow;
