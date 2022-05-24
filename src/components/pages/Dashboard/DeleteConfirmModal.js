import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

const DeleteConfirmModal = ({ order, refetch, setOrder }) => {
    const { name, quantity, _id } = order;
    const navigate = useNavigate();

    const handleDelete = (id) => {
        setOrder(null);
        fetch(`https://tools-manufacturer.herokuapp.com/orders/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth);
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
            refetch();
            return res.json();
        }
        )
    };

    return (
        <div>
            <input type="checkbox" id="deleteModal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <h3 class="text-lg font-bold mb-5">Cancel your <span className='text-error'>{name}</span> order?</h3>
                    <p className='mb-5'>You ordered {quantity} pieces of this product.</p>
                    <div className='flex justify-between'>
                        <button onClick={() => handleDelete(_id)} className='btn btn-error'>Confirm</button>
                        <label for="deleteModal" className='btn btn-warning'>Go back</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;