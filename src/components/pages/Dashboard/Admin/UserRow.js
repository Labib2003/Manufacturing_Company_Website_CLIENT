import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';

const UserRow = ({ user: user_, index, refetch }) => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const makeAdmin = (email) => {
        fetch(`https://tools-manufacturer.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'From': user.email
            },
            body: JSON.stringify({ user: email })
        })
            .then(res => {
                if (res.status !== 200) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                    return toast.error(`Error ${res.status}`);
                }
                toast.success("User has been promoted to admin")
                return res.json()
            }
            )
            .then(data => {
                console.log(data);
                refetch();
            })
    }
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{user_.email}</td>
            <td>{user_?.admin
                ?
                <p className='text-lime-500'>Admin</p>
                :
                <p className='text-secondary'>User</p>
            }</td>
            <td>{user_?.admin
                ?
                <p className='text-lime-500'>Already Admin</p>
                :
                <button
                    onClick={() => makeAdmin(user_.email)}
                    className='btn btn-success'
                >Make Admin</button>
            }</td>
        </tr>
    );
};

export default UserRow;