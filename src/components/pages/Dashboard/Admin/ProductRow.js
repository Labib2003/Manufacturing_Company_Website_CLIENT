import React from 'react';

const ProductRow = ({ product, index, refetch, setProduct }) => {
    const { name, available_quantity, per_unit_price } = product;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{available_quantity}</td>
            <td>{per_unit_price}</td>
            <td><label onClick={() => setProduct(product)} htmlFor="delete-product" className="btn btn-warning modal-button">Delete</label></td>
        </tr>
    );
};

export default ProductRow;