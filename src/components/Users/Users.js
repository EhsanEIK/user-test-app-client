import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {
    const users = useLoaderData();
    const [updateUsers, setUpdateUsers] = useState(users);

    const handleDeleteUser = id => {
        const agree = window.confirm('Are you sure?');
        if (agree) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success("User deleted successfully.");
                        const remainingUsers = updateUsers.filter(user => user._id !== id);
                        setUpdateUsers(remainingUsers);
                    }
                })
        }
    }

    return (
        <section>
            <div className='flex justify-between my-5'>
                <h2 className='text-2xl font-bold'>User List</h2>
                <Link to='/addUser'>
                    <button className='btn-primary btn-sm font-medium rounded-md'>Add User +</button>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            updateUsers.map(user =>
                                <tr>
                                    <th>{user._id}</th>
                                    <th>{user.userName}</th>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Link to={`/updateUser/${user?._id}`}>
                                            <button className="btn btn-sm bg-blue-500 border-blue-500 text-white mr-2">Edit</button>
                                        </Link>
                                        <button onClick={() => handleDeleteUser(user._id)} className="btn btn-sm bg-red-500 border-red-500 text-white">Delete</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </section >
    );
};

export default Users;