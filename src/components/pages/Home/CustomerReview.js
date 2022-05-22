import React from 'react';

const CustomerReview = ({ review }) => {
    const { user, stars, body } = review;
    return (
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title text-2xl">{stars} stars.</h2>
                <p className='text-xl'>{body}</p>
                <p>By: {user}</p>
            </div>
        </div>
    );
};

export default CustomerReview;