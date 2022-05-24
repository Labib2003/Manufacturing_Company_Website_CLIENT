import React from 'react';

const OrdersRow = ({ order, index, setOrder }) => {
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
                <button className="btn btn-success mr-3">Pay</button>
                <label
                    for="deleteModal"
                    class="btn modal-button btn-error"
                    onClick={() => setOrder(order)}
                >Cancel</label>
                {/* <button onClick={() => handleDelete(_id)} className="">Cancel Order</button> */}
            </div>}</td>
        </tr>
    );
};

export default OrdersRow;