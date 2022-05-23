import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import auth from '../../../firebase.init';
import FailedToFetch from '../../shared/FailedToFetch';
import LoadingSpinner from '../../shared/LoadingSpinner';

const Purchase = () => {
    // getting the id from url
    const { id } = useParams();

    // getting user from firebase
    const [user] = useAuthState(auth);

    // react query
    const { isLoading, error, data: tool } = useQuery('purchaseTool', () =>
        fetch(`https://tools-manufacturer.herokuapp.com/tools/${id}`).then(res =>
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
        <div class="hero mb-32">
            <div class="hero-content flex-col lg:flex-row">
                <div class="text-center md:text-left mr-10">
                    <h1 class="text-5xl font-semibold leading-normal mb-5">You are purchasing: <span className='font-bold'>{tool.name}</span></h1>
                    <p class="py-5 text-2xl">Per Unit Price: ${tool.per_unit_price}</p>
                    <p class="py-5 text-2xl">Minimum Order Quantity: {tool.min_order_quantity}</p>
                    <p class="py-5 text-2xl">Available Quantity: {tool.available_quantity}</p>
                </div>
                <div class="card flex-shrink-0 w-1/2 shadow-2xl bg-base-100">
                    <div class="card-body">
                        <h1 className="card-title">Please fill up this form to continue.</h1>
                        <form className="w-full" autoComplete="off">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={user.displayName}
                                    className="input input-bordered"
                                    readOnly
                                />
                            </div>
                            <div className="form-control mb-5">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    value={user.email}
                                    className="input input-bordered"
                                    readOnly
                                />
                            </div>
                            <div className="form-control mb-5">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder='Your address'
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mb-5">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder='Your phone number'
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mb-5">
                                <label className="label">
                                    <span className="label-text">Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder={parseInt(tool.min_order_quantity)}
                                    min={parseInt(tool.min_order_quantity)}
                                    max={parseInt(tool.available_quantity)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <input className='btn btn-accent w-full text-white' type="submit" value="Login" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Purchase;