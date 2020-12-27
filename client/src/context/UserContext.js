import React, { useState } from 'react';
import axios from 'axios';

export const UserContext = React.createContext();


const UserContextProvider = (props) => {

    const [state, setState] = useState([]);

    const [user, setUser] = useState([]);

    const addUser = (data) => {
        const access = {
            headers: {
                "Context-Type": "application/json"
            }
        };

        axios.put(`/api/tracker/update/${data.username}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));


        axios.post('/api/tracker/add', data, access)
            .then(u => setState([...state, u]))
            .catch(err => console.log(err));
    };

    const addItem = (item) => {
        const access = {
            headers: {
                "Context-Type": "application/json"
            }
        };

        axios.post('/api/tracker/addUser', item, access)
            .then(res => setUser([...user, res]))
            .catch(err => console.log(err));

        //console.log(user);
    };

    const getUser = () => {
        axios.get('/api/tracker/get')
            .then(res => setState(res.data))
            .catch(err => console.log(err));
    };

    const getItems = () => {
        axios.get('/api/tracker/getUser')
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    };

    const statusChange = async (U) => {

        const change = await axios.put(`/api/tracker/change/${U.username}`);

        const edit = await axios.put(`/api/tracker/edit/${U._id}`);

        const newState = [...state];
        const changedState = newState.map(user => {
            if (user._id === U._id) user.completedstatus = true;
            return user;
        });
        setState(changedState);
    };

    const deleteCompleted = async (U) => {
        const del = await axios.delete(`/api/tracker/delete/${U._id}`);

        const dec = await axios.put(`/api/tracker/decreaseCompleted/${U.username}`);

        getUser();
    };

    const deleteOngoing = async (U) => {
        const del = await axios.delete(`/api/tracker/delete/${U._id}`);
        //console.log(del);
        const dec = await axios.put(`/api/tracker/decreaseOngoing/${U.username}`);

        getUser();
    };

    const deleteUser = async (U) => {
        const del = await axios.delete(`/api/tracker/deleteUser/${U._id}`);

        const newUser = [...user];

        setUser(newUser.filter(per => per.username !== U.username));

        const erase = await axios.delete(`/api/tracker/erase/${U.username}`);
    };

    return (
        <UserContext.Provider value={{
            state,
            user,
            addUser,
            addItem,
            getUser,
            getItems,
            statusChange,
            deleteCompleted,
            deleteOngoing,
            deleteUser
        }}>
            {props.children}
        </UserContext.Provider>
    );


};

export default UserContextProvider;
