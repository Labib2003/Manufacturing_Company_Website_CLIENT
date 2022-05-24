import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../../firebase.init';
import FailedToFetch from '../../shared/FailedToFetch';
import LoadingSpinner from '../../shared/LoadingSpinner';

const Dashboard = () => {
    const [user] = useAuthState(auth);

    const { isLoading, error, data: userFromDb } = useQuery('userFromDb', () =>
        fetch(`http://localhost:5000/users/${user.email}`, {
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
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col">
                    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <Outlet></Outlet>
                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-80 text-base-content">
                        {
                            userFromDb.admin
                                ?
                                <>
                                    <li><Link to='/dashboard'>My Profile</Link></li>
                                    <li><Link to='/dashboard/manageAllOrders'>Manage All Orders</Link></li>
                                    <li><Link to='/dashboard/addNewProduct'>Add a Product</Link></li>
                                    <li><Link to='/dashboard/makeAdmin'>Make Admin</Link></li>
                                    <li><Link to='/dashboard/manageProducts'>Manage Products</Link></li>
                                </>
                                :
                                <>
                                    <li><Link to='/dashboard'>My Profile</Link></li>
                                    <li><Link to='/dashboard/addReview'>Add Review</Link></li>
                                    <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;