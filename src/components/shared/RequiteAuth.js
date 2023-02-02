import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import LoadingSpinner from './LoadingSpinner';

const RequiteAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    if (loading){
        return <LoadingSpinner></LoadingSpinner>
    }

    if (!user) {
        return <Navigate to="/home" state={{ from: location }} replace />;
    }

    return children;
};

export default RequiteAuth;