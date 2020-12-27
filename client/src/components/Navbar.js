import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar bg-primary bg-gradient rounded">
                <ul className='navbar nav'>
                    <li className='nav-list ms-3 h4'>Course Tracker</li>
                    <li className='nav-list ms-3'><Link className='nav-link text-dark btn btn-primary' to='/'><div className='h6 mb-0'>Home</div></Link></li>
                    <li className='nav-list ms-3'><Link className='nav-link text-dark btn btn-primary ' to='/users'><h6 className='mb-0'>Users</h6></Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
