import React from 'react';
import { useQuery } from 'react-query';
import FailedToFetch from '../../shared/FailedToFetch';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ProductRow from './ProductRow';

const ManageProducts = () => {
    const { isLoading, error, data: products, refetch } = useQuery('products', () =>
        fetch('https://tools-manufacturer.herokuapp.com/tools').then(res =>
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
        <div className='card bg-base-200 shadow-xl'>
            <div className='card-body'>
                <h1 className='text-3xl font-bold mb-10'>All users</h1>
                <table class="table table-zebra w-full">
                    <thead>
                        <tr className='text-left text-xl font-bold'>
                            <th></th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Per Unit Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => <ProductRow
                                key={product._id}
                                product={product}
                                index={index}
                                refetch={refetch}
                            ></ProductRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;