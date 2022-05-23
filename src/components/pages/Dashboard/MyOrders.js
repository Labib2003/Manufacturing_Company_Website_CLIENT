import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase.init';
import FailedToFetch from '../../shared/FailedToFetch';
import LoadingSpinner from '../../shared/LoadingSpinner';
import OrdersRow from './OrdersRow';

const MyOrders = () => {
    // user info
    const [user] = useAuthState(auth);
    const email = user.email;

    // react query
    const { isLoading, error, data: orders } = useQuery('orders', () =>
        fetch(`http://localhost:5000/orders/${email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res =>
            res.json()
        )
    )
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (error) {
        return <FailedToFetch></FailedToFetch>
    }

    return (
        <div class="overflow-x-auto">
            <h1 className='text-3xl font-bold text-center mb-10'>Your orders</h1>
            <table class="table table-zebra w-full">
                <thead>
                    <tr className='text-left text-xl font-bold'>
                        <th></th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => <OrdersRow key={order._id} order={order} index={index}></OrdersRow>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;