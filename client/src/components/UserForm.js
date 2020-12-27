import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const UserForm = () => {

    const { addUser, getItems, user } = useContext(UserContext);

    useEffect(() => {
        getItems();
    }, []);

    const initialState = {
        username: "",
        coursename: "",
        completedstatus: false
    };

    const [person, setPerson] = useState(initialState);

    const submitHandler = (e) => {
        e.preventDefault();
        addUser(person);
        setPerson(initialState);

        getItems();
    };

    const changeHandler = (e) => {
        setPerson({ ...person, [e.target.name]: e.target.value });
    };

    return (
        <div className='ms-3 mt-3'>
            <h3>New User</h3>
            <div className='row'>
                <div><Link to='/createUser' className='btn btn-primary col-sm-2'>Create New User</Link></div>
            </div>

            <form onSubmit={submitHandler} className='mt-5'>
                <h3>Existing User</h3>
                <h4>Add Course</h4>
                <div className='row'>
                    <div className='col-sm-5'>
                        <select className='form-control form-select border-3' value={person.username} name="username" onChange={changeHandler} required>
                            <option value="" selected hidden>Select User</option>
                            {
                                user.map(U => {
                                    return (
                                        <option key={U._id} value={U.username}>{U.username}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-5'>
                        <input
                            type='text'
                            className='form-control col-sm-5 mt-2 border-3'
                            placeholder='CourseName'
                            name='coursename'
                            value={person.coursename}
                            onChange={changeHandler} required />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm-5'>
                        <button className='form-control btn btn-primary mt-2' type='submit'>Submit</button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default UserForm;
