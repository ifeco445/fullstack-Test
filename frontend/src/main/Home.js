import React from 'react';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Home Page</h1>
            <p className={styles.paragraph}>Welcome to the home page!</p>
            
        </div>
    );
};

export default Home;
