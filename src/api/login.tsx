import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HOST = 'https://test.v5.pryaniky.com';  // Base URL for API requests

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');  // State for username input
  const [password, setPassword] = useState('');  // State for password input
  const [error, setError] = useState('');        // State for error message
  const navigate = useNavigate();                // Navigation hook from react-router

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${HOST}/ru/data/v3/testmethods/docs/login`, {
        username: username,
        password: password,
      });

      console.log(response)

      if (response.data && response.data.data.token) {
        const token = response.data.data.token;  // Extract token from response
        console.log(token)
        localStorage.setItem('authToken', token);  // Store token in local storage
        setError('');  // Clear any existing error message
        alert('Login successful!');
        navigate('/');  // Redirect to the homepage or another route after successful login
      } else {
        setError('Login failed. Please check your credentials and try again.');  // Set error message
      }
    } catch (err) {
      console.error('Error during authentication:', err);
      setError('An error occurred. Please try again later.');  // Set error message for network or server errors
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>Login</h1>
        {error && <p style={styles.error}>{error}</p>}  {/* Display error message if any */}
        <form onSubmit={handleSubmit}>  {/* Form to capture login credentials */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}  // Update state on input change
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

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  loginBox: {
    width: '400px',
    padding: '40px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    textAlign: 'center' as 'center',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default LoginPage;
