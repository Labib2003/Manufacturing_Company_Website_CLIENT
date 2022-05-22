import React from 'react';
import { useQuery } from 'react-query';
import LoadingSpinner from '../../shared/LoadingSpinner';
import CustomerReview from './CustomerReview';

const CustomerReviews = () => {
    const { isLoading, error, data: reviews } = useQuery('reviews', () =>
        fetch('reviewsFakeData.json').then(res =>
            res.json()
        )
    );
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className='mb-32'>
            <h1 className='text-5xl font-bold text-center'>Customer Reviews</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3'>
                {
                    reviews.map(review => <CustomerReview key={review._id} review={review}></CustomerReview>)
                }
            </div>
        </div>
    );
};

export default CustomerReviews;