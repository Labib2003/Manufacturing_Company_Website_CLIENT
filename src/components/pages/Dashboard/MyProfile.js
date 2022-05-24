import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const MyProfile = () => {
    const [user] = useAuthState(auth);

    const phoneRef = useRef(0);
    const addressRef = useRef('');

    const handleUpdateProfile = (event) => {
        event.preventDefault();
        const updatedProfile = {
            name: user.displayName,
            phone: phoneRef.current.value,
            address: addressRef.current.value
        }

        fetch(`http://localhost:5000/users/${user.email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updatedProfile)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
    }

    return (
        <div className='card shadow-xl'>
            <form onSubmit={handleUpdateProfile} className='card-body'>
                <h1 className='text-3xl font-bold'>Your Profile</h1>
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
                        <span class="label-text">Phone Number (optional)</span>
                    </label>
                    <input
                        type="number"
                        ref={phoneRef}
                        placeholder="Enter your number here."
                        class="input input-bordered w-full"
                    />
                </div>
                <div class="">
                    <label class="label">
                        <span class="label-text">Address (optional)</span>
                    </label>
                    <input
                        type="text"
                        ref={addressRef}
                        placeholder="Enter your address here."
                        class="input input-bordered w-full"
                    />
                </div>
                <input type="submit" className='btn btn-success mt-5 w-full max-w-xs mx-auto' value='update profile' />
            </form>
        </div>
    );
};

export default MyProfile;