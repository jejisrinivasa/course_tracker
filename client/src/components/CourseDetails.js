import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const CourseDetails = ({ match }) => {
    //console.log(props);

    const { state, statusChange, getUser, deleteCompleted, deleteOngoing } = useContext(UserContext);
    let User = [], UserName, completed = [], incomplete = [];
    if (state.length > 0) {
        //console.log(state);
        User = state.filter(user => user.username === match.params.name);
        if (User.length > 0) {
            UserName = User[0].username;
            completed = state.filter(user => user.username === UserName && user.completedstatus);
            incomplete = state.filter(user => user.username === UserName && !user.completedstatus);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className='ms-3 mt-3'>
            { User.length === 0 ? (<h4 className='text-center'>You don't have any ongoing or completed courses</h4>) :
                (
                    <div>
                        <h2>Your Courses</h2>
                        {
                            completed.length > 0 ?
                                (<div className='mb-5 mt-4'>
                                    <h4>Completed Courses</h4>
                                    <table className='table table-dark table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Coursename</th>
                                                <th>Status</th>
                                                <th>Delete Course</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                completed.map(user => {
                                                    return (
                                                        <tr key={user._id}>
                                                            <td>{user.coursename}</td>
                                                            <td>Completed</td>
                                                            <td><button className='btn btn-primary'
                                                                onClick={() => deleteCompleted(user)}>Delete</button></td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>) : (<h4 className='mt-4 mb-5'>No course is Completed</h4>)
                        }
                        {
                            incomplete.length > 0 ?
                                (<div>
                                    <h4>Ongoing Courses</h4>
                                    <table className='table table-dark table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Coursename</th>
                                                <th>Status</th>
                                                <th>Change</th>
                                                <th>Delete Course</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                incomplete.map(user => {
                                                    return (
                                                        <tr key={user._id}>
                                                            <td>{user.coursename}</td>
                                                            <td>Ongoing</td>
                                                            <td><button className="btn btn-primary"
                                                                onClick={() => statusChange(user)}>Complete</button></td>
                                                            <td><button className='btn btn-primary'
                                                                onClick={() => deleteOngoing(user)}>Delete</button></td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>) : (<h4>All Courses are completed</h4>)
                        }
                    </div>
                )
            }
        </div>
    );
};

export default CourseDetails;
