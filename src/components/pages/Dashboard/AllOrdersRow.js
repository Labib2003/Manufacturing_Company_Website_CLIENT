import React from 'react';

const AllOrdersRow = ({ order, index, refetch }) => {
    const { _id, name, email, quantity, paid, shipped } = order;

    const handleShipping = (id) => {
        fetch(`http://localhost:5000/allOrders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => refetch())
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{quantity}</td>
            <td>{paid ? 'Paid' : 'Unpaid'}</td>
            <td>{paid ? shipped ? 'Shipped' : <button className='btn btn-success' onClick={() => handleShipping(_id)}>Ship</button> : 'Payment Pending'}</td>
        </tr>
    );
};

export default AllOrdersRow;