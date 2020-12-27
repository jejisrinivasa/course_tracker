import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { v4 as uuid } from 'uuid';

const UserList = () => {
    const { getItems, user, deleteUser } = useContext(UserContext);

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div className='ms-3 mt-3'>
            { user.length === 0 ? <div><h4 className='text-center'>Currently we don't have any users</h4>
                <h6 className='text-center'>Create New User & Add courses</h6></div> :
                <div>
                    <h3>User's List</h3>
                    <table className='table table-dark table-striped'>
                        <thead>
                            <tr>
                                <th>User name</th>
                                <th>Ongoing Courses</th>
                                <th>Completed Courses</th>
                                <th>Details</th>
                                <th>Delete User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map(u => {
                                    return (
                                        <tr key={uuid()}>
                                            <td>{u.username}</td>
                                            <td>{u.ongoing}</td>
                                            <td>{u.completed}</td>
                                            <td><Link className='nav-link' to={`/users/${u.username}`}>More Details...</Link></td>
                                            <td><button onClick={() => deleteUser(u)} className='btn btn-primary'>Delete</button></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default UserList;
