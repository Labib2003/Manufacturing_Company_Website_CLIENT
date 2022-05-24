import React from 'react';
import { useQuery } from 'react-query';
import FailedToFetch from '../../shared/FailedToFetch';
import LoadingSpinner from '../../shared/LoadingSpinner';
import AllOrdersRow from './AllOrdersRow';

const ManageAllOrders = () => {
    const { isLoading, error, data: allOrders, refetch } = useQuery('allOrders', () =>
        fetch('http://localhost:5000/orders', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res =>
            res.json()
        )
    );
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    };
    if (error) {
        return <FailedToFetch></FailedToFetch>
    };
    return (
        <div>
            <div className='card shadow-xl'>
            <div class="overflow-x-auto card-body">
                <h1 className='text-3xl font-bold mb-10'>Your orders</h1>
                <table class="table table-zebra w-full">
                    <thead>
                        <tr className='text-left text-xl font-bold'>
                            <th></th>
                            <th>Name</th>
                            <th>CLient</th>
                            <th>Quantity</th>
                            <th>Payment Status</th>
                            <th className='text-center'>Shipping</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allOrders.map((order, index) => <AllOrdersRow
                                key={order._id}
                                order={order}
                                index={index}
                                refetch={refetch}
                            ></AllOrdersRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default ManageAllOrders;