import React, { useEffect, useState } from 'react'
import axios from 'axios';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:5000/users/', {
            withCredentials: true
        }).then((response) => {
            if (response.data) {
                setUsers(response.data);
            }
        }).catch((error) => {
            console.error('Failed to fetch users:', error);
        });
    };

    const handleDelete = async (userId) => {
        axios.delete(`http://localhost:5000/users/${userId}`, {
            withCredentials: true
        })
            .then((response) => {
                if (response.status === 200) {
                    // Remove the deleted user from the list
                    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
                } else {
                    console.warn('Unexpected server response:', response);
                    alert('Failed to delete the user.');
                }
            })
            .catch((error) => {
                console.error('Error deleting the user:', error);
                alert('An error occurred while trying to delete the user.');
            });
    };



    return (
        <div>
            <h2>All Users</h2>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>{user.longitude}</td>
                                <td>{user.latitude}</td>
                                <td>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
export default AllUsers;
