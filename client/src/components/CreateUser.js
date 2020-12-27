import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const CreateUser = () => {
    const { addItem } = useContext(UserContext);

    const [item, setItem] = useState({
        username: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem(item);
        setItem({ username: "" });

        window.location = '/';
    };

    return (
        <div className='ms-3 mt-3'>
            <form onSubmit={handleSubmit}>
                <h3>Create User</h3>
                <div className='row'>
                    <div className='col-sm-4'>
                        <input type='text'
                            className='form-control border-3'
                            placeholder='Username'
                            value={item.username}
                            name='username'
                            onChange={e => setItem({ username: e.target.value })} />
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-sm-4'>
                        <button className='form-control btn btn-primary' type='submit'>Add User</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
