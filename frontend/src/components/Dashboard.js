import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import PostList from './PostList';
import AuthContext from '../context/AuthContext';
import PostForm from './PostForm';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const { token, isLoggedIn } = useContext(AuthContext);

 

  return (
    
    <div>
    {isLoggedIn ? (
      <>
    <h2>Dashboard</h2>
    <PostList /></>
   
    ) : null}
   

    </div>
  ) 
};

export default Dashboard;
