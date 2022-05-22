import React from 'react';

const LoadingSpinner = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondary mb-5"></div>
                <h3 className='text-3xl font-semibold'>Loading...</h3>
            </div>
        </div>
    );
};

export default LoadingSpinner;