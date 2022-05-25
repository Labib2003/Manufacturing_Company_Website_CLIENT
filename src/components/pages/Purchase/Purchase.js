import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import FailedToFetch from '../../shared/FailedToFetch';
import LoadingSpinner from '../../shared/LoadingSpinner';

const Purchase = () => {
    // getting the id from url
    const { id } = useParams();

    const phoneRef = useRef(0);
    const quantityRef = useRef(0);
    const addressRef = useRef('');

    // getting user from firebase
    const [user] = useAuthState(auth);

    // react query
    const { isLoading, error, data: tool, refetch } = useQuery('purchaseTool', () =>
        fetch(`https://tools-manufacturer.herokuapp.com/tool/${id}`).then(res => res.json())
    );
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    };
    if (error) {
        return <FailedToFetch></FailedToFetch>
    };

    const handleOrder = (event) => {
        event.preventDefault();
        const order = {
            email: user.email,
            per_unit_price: tool.per_unit_price,
            name: tool.name,
            phone: phoneRef.current.value,
            address: addressRef.current.value,
            quantity: quantityRef.current.value,
            paid: false,
            transactionId: ''
        };
        const newQuantity = parseInt(tool.available_quantity) - parseInt(quantityRef.current.value);
        fetch('https://tools-manufacturer.herokuapp.com/order', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => console.log(data));
        fetch(`https://tools-manufacturer.herokuapp.com/tool/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ available_quantity: newQuantity })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success("Order placed successfully. Check your dashboard to confirm your order and pay.")
                refetch();
            });
    }

    return (
        <div className="hero mb-32">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center md:text-left lg:mr-10">
                    <h1 className="text-5xl font-semibold leading-normal mb-5">You are purchasing: <span className='font-bold'>{tool.name}</span></h1>
                    <p className="py-5 text-2xl">Per Unit Price: ${tool.per_unit_price}</p>
                    <p className="py-5 text-2xl">Minimum Order Quantity: {tool.min_order_quantity}</p>
                    <p className="py-5 text-2xl">Available Quantity: {tool.available_quantity}</p>
                </div>
                <div className="card flex-shrink-0 w-full lg:w-1/2 shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="card-title">Please fill up this form to continue.</h1>
                        <form onSubmit={handleOrder} className="w-full" autoComplete="off">
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
                                    <span className="label-text">Phone</span>
                                </label>
                                <input
                                    type="number"
                                    ref={phoneRef}
                                    placeholder='Your phone number'
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mb-5">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input
                                    type="text"
                                    ref={addressRef}
                                    placeholder='Delivery address'
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
                                    ref={quantityRef}
                                    placeholder={parseInt(tool.min_order_quantity)}
                                    min={parseInt(tool.min_order_quantity)}
                                    max={parseInt(tool.available_quantity)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <input
                                className='btn btn-secondary w-full text-white'
                                type="submit"
                                value="Place Order"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Purchase;