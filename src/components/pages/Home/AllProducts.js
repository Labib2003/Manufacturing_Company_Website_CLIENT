import React from 'react';
import { useQuery } from 'react-query';
import FailedToFetch from '../../shared/FailedToFetch';
import LoadingSpinner from '../../shared/LoadingSpinner';
import Tool from './Tool';

const AllProducts = () => {
    const { isLoading, error, data: tools } = useQuery('tools', () =>
        fetch('http://localhost:5000/tools').then(res =>
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
            <h1 className='text-3xl font-bold mb-5 text-center'>All Products</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mb-32'>
                {
                    tools.map(tool => <Tool
                        key={tool._id}
                        tool={tool}
                    ></Tool>)
                }
            </div>
        </div>
    );
};

export default AllProducts;