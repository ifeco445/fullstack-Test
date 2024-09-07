import { useState, useContext, } from 'react';
import AuthContext from '../context/AuthContext';
import styles from '../css/Register.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
  const { register } = useContext(AuthContext);
  const [name, setName] = useState()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
    navigate('/login')
  };

    return (
      <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
              <h2>Register</h2>
              <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Name</label>
                  <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.input}
                      required
                  />
              </div>
              <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                      required
                  />
              </div>
              <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.label}>Password</label>
                  <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.input}
                      required
                  />
              </div>
              <button type="submit" className={styles.submitButton}>Register</button>
          </form>
      </div>
  );
};

export default Register;
