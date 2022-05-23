import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
    // react firebase hooks
    const [user] = useAuthState(auth);

    const navElements = <>
        <li><a>Item 1</a></li>
        <li tabIndex="0">
            <a className="justify-between" >
                Parent
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
            </a>
            <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
            </ul>
        </li>
        <li>{user ? <button onClick={() => {
            signOut(auth);
            localStorage.removeItem('accessToken');
        }}>Log Out</button> : <Link to='/login'>Login</Link>}</li>
    </>
    return (
        <div className="navbar bg-base-100 mb-32">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navElements}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">IronWorks</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {navElements}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;