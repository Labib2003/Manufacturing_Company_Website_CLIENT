import { signOut } from 'firebase/auth';
import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const phoneRef = useRef(0);
    const addressRef = useRef('');

    const handleUpdateProfile = (event) => {
        event.preventDefault();
        const updatedProfile = {
            name: user.displayName,
            phone: phoneRef.current.value,
            address: addressRef.current.value
        }

        fetch(`http://localhost:5000/user/${user.email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updatedProfile)
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
            .then(data => {
                console.log(data);
            });
    }

    return (
        <div className='card shadow-xl bg-base-200'>
            <form
                onSubmit={handleUpdateProfile}
                className='card-body'
            >
                <h1 className='text-3xl font-bold'>Your Profile</h1>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        value={user.displayName}
                        className="input input-bordered w-full"
                        readOnly
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="text"
                        value={user.email}
                        className="input input-bordered w-full"
                        readOnly
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Phone Number (optional)</span>
                    </label>
                    <input
                        type="number"
                        ref={phoneRef}
                        placeholder="Enter your number here."
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="">
                    <label className="label">
                        <span className="label-text">Address (optional)</span>
                    </label>
                    <input
                        type="text"
                        ref={addressRef}
                        placeholder="Enter your address here."
                        className="input input-bordered w-full"
                    />
                </div>
                <input
                    type="submit"
                    className='btn btn-secondary mt-5 w-full max-w-xs mx-auto'
                    value='update profile'
                />
            </form>
        </div>
    );
};

export default MyProfile;