import React from 'react';
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
        fetch(`http://localhost:5000/tools/${id}`).then(res =>
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
        <div className='flex justify-center mb-32'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">You are purchasing <span className='font-bold'>{tool.name}</span></h2>
                    <form autoComplete="off">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                value={user.displayName}
                                className="input input-bordered w-full max-w-xs"
                                readOnly
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mb-5">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                value={user.email}
                                className="input input-bordered w-full max-w-xs"
                                readOnly
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mb-5">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                placeholder='Your address'
                                className="input input-bordered w-full max-w-xs"
                                required
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mb-5">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                type="number"
                                placeholder='Your phone number'
                                className="input input-bordered w-full max-w-xs"
                                required
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mb-5">
                            <label className="label">
                                <span className="label-text">Quantity</span>
                            </label>
                            <input
                                type="number"
                                placeholder={parseInt(tool.min_order_quantity)}
                                min={parseInt(tool.min_order_quantity)}
                                max={parseInt(tool.available_quantity)}
                                className="input input-bordered w-full max-w-xs"
                                required
                            />
                        </div>
                        <input className='btn btn-accent w-full max-w-xs text-white' type="submit" value="Login" />
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Purchase;