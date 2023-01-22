import React, { useState } from "react";
import { useQuery } from "react-query";
import FailedToFetch from "../../../shared/FailedToFetch";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import ConfirmDeleteProductModal from "./ConfirmDeleteProductModal";
import ProductRow from "./ProductRow";

const ManageProducts = () => {
  const [product, setProduct] = useState({});

  const {
    isLoading,
    error,
    data: products,
    refetch,
  } = useQuery("products", () =>
    fetch("https://ironworks-backend.onrender.com/api/v1/tools").then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    return <FailedToFetch></FailedToFetch>;
  }
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="overflow-x-auto card-body">
        <h1 className="text-3xl font-bold mb-10">All products</h1>
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-left text-xl font-bold">
              <th className="invisible"></th>
              <th>Name</th>
              <th>Stock</th>
              <th>Per Unit Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.data.map((product, index) => (
              <ProductRow
                key={product._id}
                product={product}
                index={index}
                setProduct={setProduct}
              ></ProductRow>
            ))}
          </tbody>
        </table>
        {product && (
          <ConfirmDeleteProductModal
            product={product}
            setProduct={setProduct}
            refetch={refetch}
          ></ConfirmDeleteProductModal>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
