// ErrorPage.js
import React from 'react';
import errorLogo from '../assets/error.png';

const ErrorPage = ({ message }) => {
  return (
    <div style={styles.container}>
      <img src={errorLogo} alt="Error" style={styles.logo} />
      <h2 style={styles.title}>Oops! Something went wrong.</h2>
      <p style={styles.message}>
        We're sorry for the inconvenience. Please try again later or contact support if the problem persists.
      </p>
      <button style={styles.button} onClick={() => window.location.href = '/'}>
        Go Back Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    padding: '20px',
  },
  logo: {
    width: '150px',
    height: '150px',
    marginBottom: '20px',
    borderRadius: '20%',
  },
  title: {
    fontSize: '2em',
    color: '#dc3545',
    margin: '10px 0',
  },
  message: {
    fontSize: '1.2em',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ErrorPage;
