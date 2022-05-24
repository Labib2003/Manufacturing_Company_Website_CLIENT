import React from 'react';

const ProductRow = ({ product, index, refetch }) => {
    const {_id, name, available_quantity, per_unit_price } = product;
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/tool/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => refetch());
    }
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{available_quantity}</td>
            <td>{per_unit_price}</td>
            <td><button className='btn btn-error' onClick={() => handleDelete(_id)}>Delete</button></td>
        </tr>
    );
};

export default ProductRow;