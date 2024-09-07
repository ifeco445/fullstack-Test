// src/components/FriendList.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import styles from '../css/FriendList.module.css'; // Assuming you have a CSS module for styling

const FriendList = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [friendId, setFriendId] = useState('');
  const [message, setMessage] = useState('');
  const { id } = useContext(AuthContext);

  // Fetch user details including friends
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/friends/${id}`);
        setUser(response.data);
      } catch (error) {
        setMessage('Error fetching user data');
      }
    };

    fetchUser();
  }, [userId]);

  // Handle form submission for adding a friend
  const handleAddFriend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/addFriend/${id}`, { friendId });
      setMessage(response.data.message || 'Friend added successfully');
      setFriendId(''); // Clear input field after adding

      // Fetch updated user info
      const updatedUser = await axios.get(`http://localhost:5000/api/friends/${id}`);
      setUser(updatedUser.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding friend');
    }
  };

  return (
    <div className={styles.friendListContainer}>
      <h1>{user?.name}'s Friends List</h1>

      <ul className={styles.friendList}>
        {user?.friends.length > 0 ? (
          user.friends.map((friend) => (
            <li key={friend._id} className={styles.friendItem}>
              {friend.name} - {friend.email}
            </li>
          ))
        ) : (
          <p>No friends added yet.</p>
        )}
      </ul>

      <form onSubmit={handleAddFriend} className={styles.addFriendForm}>
        <input
          type="text"
          placeholder="Friend ID"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
          className={styles.friendIdInput}
        />
        <button type="submit" className={styles.addFriendButton}>
          Add Friend
        </button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default FriendList;
