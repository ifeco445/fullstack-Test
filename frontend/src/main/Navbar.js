import React from 'react';
import styles from './Navbar.module.css';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/login');
  }

    return (
      <header className={styles.navbar}>
        <nav>
          <ul className={styles['nav-links']}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Posts</Link></li>
            <li><Link to="/friends">Friends</Link></li>
            <li><Link to="/usersId">Find Friends</Link></li>
          </ul>
        </nav>
     <div className={styles['auth-buttons']}>
        {isLoggedIn ? <button onClick={handleLogout}>Logout</button> : 
        <>
          <Link to="/register"><button>Register</button></Link> 
          <Link to="/login"><button>Login</button></Link>
          </>}
        </div>
      </header>
    );
  }
  
  export default Navbar;