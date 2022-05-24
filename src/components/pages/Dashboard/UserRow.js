import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

const UserRow = ({ user, index, refetch }) => {
    const navigate = useNavigate();
    const makeAdmin = (email) => {
        fetch(`http://localhost:5000/users/admin/${email}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ user: email })
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
            .then(data => refetch())
    }
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{user.email}</td>
            <td>{user?.admin ? 'Admin' : 'User'}</td>
            <td>{user?.admin ? 'Already Admin' : <button onClick={() => makeAdmin(user.email)} className='btn btn-success'>Make Admin</button>}</td>
        </tr>
    );
};

export default UserRow;