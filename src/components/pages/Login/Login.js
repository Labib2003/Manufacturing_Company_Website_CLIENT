import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import auth from '../../../firebase.init';
import useToken from '../../../hooks/useToken';
import { toast } from 'react-toastify';

const Login = () => {
    // react firebase hooks
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);

    const emailRef = useRef();

    // react hook form
    const { register, formState: { errors }, handleSubmit } = useForm();
    let errorMessage;
    const onSubmit = async (data) => {
        errorMessage = '';
        await signInWithEmailAndPassword(data.email, data.password);
    };

    // getting jwt
    const [token] = useToken(user || googleUser);

    // navigate to previous page
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        };
    }, [token, from, navigate]);

    // error handling
    if (error || googleError) {
        errorMessage = `${error ? error?.message : ''} ${googleError ? googleError?.message : ''}`;
    };

    // password reset email
    const handleSendResetEmail = async () => {
        const email = emailRef.current.value
        await sendPasswordResetEmail(email);
        toast.success("Password Reset Email Sent!");
    }

    return (
        <div className='flex justify-center mb-32'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                ref={emailRef}
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        message: 'Please provide a valid Email'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                        message: "Password must contain minimum eight characters, at least one letter and one number"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        <p className='mb-5 text-red-500'>{errorMessage}</p>
                        <p className='mb-5'>Forgot password? <span
                            className='text-secondary cursor-pointer'
                            onClick={handleSendResetEmail}>Send password reset email</span></p>
                        <input className='btn btn-secondary w-full max-w-xs text-white' type="submit" value="Login" />
                    </form>
                    <p><small>New to our site? <Link className='text-secondary' to="/register">Create New Account</Link></small></p>
                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline"
                    >Continue with Google</button>
                </div>
            </div>
        </div >
    );
};

export default Login;