// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/UsersList.module.css'; // Import the CSS module

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Fetch users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user'); // Fetch from backend
        setUsers(response.data);  // Set fetched users
      } catch (err) {
        setError('Error fetching users');
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div className={styles.userListContainer}>
      <h1 className={styles.userListTitle}>Users List</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {users.length > 0 ? (
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Name</th>
              <th className={styles.tableHeader}>ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{user.name}</td>
                <td className={styles.tableCell}>{user._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noUsersMessage}>No users available</p>
      )}
    </div>
  );
};

export default UserList;
