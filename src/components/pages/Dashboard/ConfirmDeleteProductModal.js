import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

const ConfirmDeleteProductModal = ({ product, refetch, setProduct }) => {
    const { _id, name } = product;
    const navigate = useNavigate();

    const handleDelete = (id) => {
        setProduct(null);
        fetch(`http://localhost:5000/tool/${id}`, {
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
    }

    return (
        <div>
            <input type="checkbox" id="delete-product" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <h3 class="text-lg font-bold mb-10">Are you sure you want to delete {name}?</h3>
                    <div className='flex justify-around'>
                        <button className='btn btn-error' onClick={() => handleDelete(_id)}>Delete</button>
                        <label for="delete-product" class="btn btn-success">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteProductModal;