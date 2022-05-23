import React from 'react';

const OrdersRow = ({ order, index, refetch }) => {
    const { name, quantity, per_unit_price, paid, _id } = order;
    const totalPrice = parseInt(quantity) * parseInt(per_unit_price);

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'DELETE',
        }).then(res => refetch());
    };

    return (
        <tr className='text-xl'>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>${totalPrice}</td>
            <td>{paid ? 'Paid' : 'Pending'}</td>
            <td>{paid ? 'Your order will be delivered soon' : <div className='flex'>
                <button className="btn btn-primary mr-3">Pay</button>
                <button onClick={() => handleDelete(_id)} className="btn btn-warning">Delete</button>
            </div>}</td>
        </tr>
    );
};

export default OrdersRow;