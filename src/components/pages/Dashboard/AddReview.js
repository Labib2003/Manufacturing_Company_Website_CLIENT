import { signOut } from 'firebase/auth';
import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

const AddReview = () => {
    // getting user info
    const [user] = useAuthState(auth);
     const navigate = useNavigate();

    const starsRef = useRef(0);
    const reviewRef = useRef('');

    // posting new review
    const handleSubmitReview = (event) => {
        event.preventDefault();
        const review = {
            user: user.displayName,
            email: user.email,
            stars: `${starsRef.current.value}/5`,
            body: reviewRef.current.value
        }
        fetch('https://tools-manufacturer.herokuapp.com/reviews', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
                return res.json()
            }
            )
            .then(data => console.log(data));
    }
    return (
        <div className='card shadow-xl'>
            <form onSubmit={handleSubmitReview} className='card-body'>
                <h1 className='text-3xl font-bold'>Please let us know your experience with us.</h1>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        value={user.displayName}
                        class="input input-bordered w-full"
                        readOnly
                    />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input
                        type="text"
                        value={user.email}
                        class="input input-bordered w-full"
                        readOnly
                    />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Rating (Out of 5)</span>
                    </label>
                    <input
                        type="number"
                        min='0'
                        max='5'
                        ref={starsRef}
                        placeholder="Enter your rating here."
                        class="input input-bordered w-full"
                        required
                    />
                </div>
                <div class="">
                    <label class="label">
                        <span class="label-text">Review</span>
                    </label>
                    <input
                        type="text"
                        ref={reviewRef}
                        placeholder="Enter your review here."
                        class="input input-bordered w-full"
                        required
                    />
                </div>
                <input type="submit" className='btn btn-success mt-5 w-full max-w-xs mx-auto' />
            </form>
        </div>
    );
};

export default AddReview;