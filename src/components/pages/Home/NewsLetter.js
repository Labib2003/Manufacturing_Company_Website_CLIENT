import React from 'react';

const NewsLetter = () => {
    return (
        <div className="hero mb-32">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h1 className="text-3xl font-bold">Subscribe to our monthly newsletter!</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-secondary">Subscribe!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;