import React from 'react';

const FailedToFetch = () => {
    return (
        <div className='grid h-screen place-items-center text-xl font-semibold'>
            <p>Server did not respond. Please check your internet or try later.</p>
        </div>
    );
};

export default FailedToFetch;