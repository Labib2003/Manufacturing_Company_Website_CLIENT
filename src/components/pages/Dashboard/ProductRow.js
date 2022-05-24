import React from 'react';

const ProductRow = ({ product, index, refetch, setProduct }) => {
    const { name, available_quantity, per_unit_price } = product;
    
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{available_quantity}</td>
            <td>{per_unit_price}</td>
            <td><label onClick={() => setProduct(product)} for="delete-product" class="btn btn-warning modal-button">Delete</label></td>
            {/* <button className='btn btn-error' onClick={() => handleDelete(_id)}>Delete</button> */}
        </tr>
    );
};

export default ProductRow;