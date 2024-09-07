import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import styles from '../css/Login.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
              <h2>Login</h2>
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
              <button type="submit" className={styles.submitButton}>Login</button>
          </form>
      </div>
  );
};

export default Login;
