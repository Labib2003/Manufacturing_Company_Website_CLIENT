import React from 'react';

const OrdersRow = ({ order, index }) => {
    const { name, quantity, per_unit_price, paid } = order;
    const totalPrice = parseInt(quantity) * parseInt(per_unit_price);
    return (
        <tr className='text-xl'>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>${totalPrice}</td>
            <td>{paid ? 'Paid' : 'Pending'}</td>
            <td>{paid ? 'Your order will be delivered soon' : <div className='flex'>
                <button className="btn btn-primary mr-3">Pay</button>
                <button className="btn btn-warning">Delete</button>
            </div>}</td>
        </tr>
    );
};

export default OrdersRow;