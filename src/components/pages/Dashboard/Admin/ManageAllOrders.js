import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';
import FailedToFetch from '../../../shared/FailedToFetch';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import AllOrdersRow from './AllOrdersRow';

const ManageAllOrders = () => {
    const navigate = useNavigate();
    
    const { isLoading, error, data: allOrders, refetch } = useQuery('allOrders', () =>
        fetch('https://tools-manufacturer.herokuapp.com/orders', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth);
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
            return res.json()
        }
        )
    );
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    };
    if (error) {
        return <FailedToFetch></FailedToFetch>
    };
    return (
            <div className='card shadow-xl bg-base-200'>
                <div className="overflow-x-auto card-body">
                    <h1 className='text-3xl font-bold mb-10'>Your orders</h1>
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className='text-left text-xl font-bold'>
                                <th className='invisible'></th>
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
    );
};

export default ManageAllOrders;