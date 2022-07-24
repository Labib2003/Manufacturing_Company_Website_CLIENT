import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';

const DeleteConfirmModal = ({ order, refetch, setOrder }) => {
    const { name, quantity, _id } = order;
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const handleDelete = (id) => {
        setOrder(null);
        fetch(`http://localhost:5000/order/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'From': user.email
            }
        }).then(res => {
            if (res.status !== 200) {
                signOut(auth);
                localStorage.removeItem('accessToken');
                navigate('/login');
                toast.error(`Error ${res.status}`);
            }
            refetch();
            toast.success("Order cancelled.")
            return res.json();
        }
        )
    };

    return (
        <div>
            <input type="checkbox" id="deleteModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <h3 className="text-lg font-bold mb-5">Cancel your <span className='text-error'>{name}</span> order?</h3>
                    <p className='mb-5'>You ordered {quantity} pieces of this product.</p>
                    <div className='flex justify-between'>
                        <button
                            onClick={() => handleDelete(_id)}
                            className='btn btn-error'
                        >Confirm</button>
                        <label
                            htmlFor="deleteModal"
                            className='btn btn-warning'
                        >Go back</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;