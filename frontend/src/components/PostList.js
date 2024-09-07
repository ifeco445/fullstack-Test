import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import styles from '../css/PostList.module.css'; // Import the CSS module

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, id } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log(id);
      try {
        const response = await axios.get(`http://localhost:5000/api/post/${id}`);
        setPosts(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.postListContainer}>
      <h2 className={styles.postListTitle}>Posts</h2>
      <Link to="/create"><div className={styles.createPost}><h4>Create Post</h4></div></Link>
       
      {posts.length > 0 ? (
        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postContent}>{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noPosts}>No posts available</p>
      )}
    </div>
  );
};

export default PostList;
