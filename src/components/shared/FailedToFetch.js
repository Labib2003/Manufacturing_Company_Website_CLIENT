import React from 'react';

const FailedToFetch = () => {
    return (
        <div className='grid h-screen place-items-center text-xl font-semibold'>
            <p>Failed To fetch data from the server. Please check your internet connection.</p>
        </div>
    );
};

export default FailedToFetch;