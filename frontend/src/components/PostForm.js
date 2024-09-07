import React, { useState } from 'react';
import styles from '../css/PostForm.module.css';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const { id } = useContext(AuthContext); // Get the post ID from the AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the post data
        try {
            const response = await axios.post(`http://localhost:5000/api/post/${id}`, {title, content})
            console.log(response)
            setTitle(''); // Clear the form
            setContent('');
        } catch (error) {
            setMessage('Error: ' + error.message); // Set the error message
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Create a Post</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="title">Title</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="content">Content</label>
                    <textarea
                        className={styles.textarea}
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>

                <button className={styles.button} type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default PostForm;
