import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import FailedToFetch from '../../shared/FailedToFetch';
import LoadingSpinner from '../../shared/LoadingSpinner';
import Tool from './Tool';

const Tools = () => {
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
    const firstSix = tools.slice(0, 6);
    return (
        <div className='mb-32 grid place-items-center'>
            <h1 className='text-3xl font-bold mb-5'>Our Product Line (Total Product: {tools.length})</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mb-5'>
                {
                    firstSix.map(tool => <Tool
                        key={tool._id}
                        tool={tool}
                    ></Tool>)
                }
            </div>
            <Link className='btn btn-secondary' to='/allProducts'>All Products</Link>
        </div>
    );
};

export default Tools;