import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from '../utils/utils';

const HOST = `${process.env.REACT_APP_HOST_URL}`

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');        
  const navigate = useNavigate();               

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${HOST}/ru/data/v3/testmethods/docs/login`, {
        username: username,
        password: password,
      });

      console.log(response)

      if (response.data && response.data.data.token) {
        const token = response.data.data.token; 
        console.log(token)
        localStorage.setItem('authToken', token);  
        setError('');  
        alert('Login successful!');
        navigate('/');  
      } else {
        setError('Login failed. Please check your credentials and try again.');  
      }
    } catch (err) {
      console.error('Error during authentication:', err);
      setError('An error occurred. Please try again later.');  
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>Login</h1>
        {error && <p style={styles.error}>{error}</p>}  
        <form onSubmit={handleSubmit}>  
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Update state on input change
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};



export default LoginPage;
