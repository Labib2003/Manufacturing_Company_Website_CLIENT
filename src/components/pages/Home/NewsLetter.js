import React from 'react';

const NewsLetter = () => {
    return (
        <div class="hero mb-32">
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mr-10">
                <div class="card-body">
                    <h1 class="text-3xl font-bold">Subscribe to our monthly newsletter!</h1>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="email" class="input input-bordered" />
                    </div>
                    <div class="form-control mt-6">
                        <button class="btn btn-primary">Subscribe!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;