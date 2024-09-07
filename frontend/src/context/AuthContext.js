import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId]= useState(localStorage.getItem('id') || null);
  
  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5000/api/login', { email, password });
    setToken(res.data.token);
    setId(res.data.user.id);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('id', res.data.user.id);
    setIsLoggedIn(true);
  };

  const register = async (name, email, password) => {
    const res = await axios.post('http://localhost:5000/api/register', { name, email, password });
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
  };

  const logout = async () => {
    await axios.post('http://localhost:5000/api/logout')
    setToken(null);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    
  };

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds

        // Check if token is expired
        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true); // Token is valid and not expired
        } else {
          localStorage.removeItem("token"); // Token is expired, remove it
          setIsLoggedIn(false);
        }
      } catch (e) {
        setIsLoggedIn(false); // Invalid token
      }
    } else {
      setIsLoggedIn(false); // No token
    }
  }, []);




  return (
    <AuthContext.Provider value={{ token, login, register, logout, isLoggedIn, id }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
