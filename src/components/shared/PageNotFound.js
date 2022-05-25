import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className='h-screen'>
            <div className='grid place-items-center'>
                <div className='text-center my-10'>
                    <h1 className='text-5xl font-bold mb-5'>Oops!</h1>
                    <p className='text-3xl font-bold text-error'>This page is not available</p>
                </div>
                <Link className='btn btn-secondary' to='/'>Go back to home</Link>
            </div>
        </div>
    );
};

export default PageNotFound;