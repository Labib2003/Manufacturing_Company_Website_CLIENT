import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useQuery } from 'react-query';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import FailedToFetch from '../components/shared/FailedToFetch';
import auth from '../firebase.init';

const RequireAdmin = ({ children }) => {
    const location = useLocation();
    const [user, loading] = useAuthState(auth);
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
    if (loading || isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    };
    if (error) {
        return <FailedToFetch></FailedToFetch>
    };

    const admin = userFromDb?.admin;

    if (!user || !admin) {
        signOut(auth);
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default RequireAdmin;