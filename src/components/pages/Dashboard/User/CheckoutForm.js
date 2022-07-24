import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';

const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [user] = useAuthState(auth);

    const { quantity, per_unit_price, email, _id } = order;
    const price = quantity * per_unit_price;

    const [stripeError, setStripeError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionID] = useState('');

    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price: price })
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
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            })
    }, [price, navigate]);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setStripeError('');
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setStripeError(error?.message);
            console.log('[error]', error);
        } else {
            setStripeError('');
        }

        // confirm
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: email,
                    },
                },
            },
        );

        if (intentError) {
            setStripeError(intentError?.message);
        }
        else {
            setStripeError('');
            setSuccess("Payment successful!");
            setTransactionID(paymentIntent.id);
            fetch(`http://localhost:5000/order/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'From': user.email
                },
                body: JSON.stringify({ transactionId: paymentIntent.id })
            })
                .then(res => {
                    if (res.status !== 200) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/login');
                        toast.error(`Error ${res.status}`)
                    }
                    toast.success("Payment status updated.")
                    return res.json()
                }
                )
                .then(data => console.log(data))
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <p className='text-xl text-red-500 font-semibold my-5'>{stripeError}</p>
            <p className='text-xl text-lime-500 font-semibold my-5'>{(success && transactionId) && `${success} Transaction Id: ${transactionId}`}</p>
            <button
                className='btn btn-success'
                type="submit"
                disabled={!stripe || !clientSecret}
            >Pay</button>
        </form>
    );
};

export default CheckoutForm;