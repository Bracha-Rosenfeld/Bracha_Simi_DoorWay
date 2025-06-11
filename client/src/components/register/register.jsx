import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { useCurrentUser } from '../userProvider';
import CryptoJS from 'crypto-js';
import styles from './register.module.css'

// Sign Up Form
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVer, setPasswordVer] = useState('');
  const [alertDiv, setAlert] = useState('');
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, isLoadingUser } = useCurrentUser();
  const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
  const IV = CryptoJS.enc.Utf8.parse('6543210987654321');
  const [error, setError] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Check if already logged in via cookie
  useEffect(() => {
    if (isLoadingUser) return;// Wait for the user to load

    if (currentUser && currentUser.id !== -1) {
      navigate('/');
    }
  }, [currentUser, isLoadingUser, navigate]);

  useEffect(() => {
    if (isFirstLoad) {
      setCurrentUser({ id: -1, username: '', email: '' });
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, setCurrentUser]);

  const manageMassages = (message) => {
    setAlert(message);
  }
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPassStrong = () => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };
  //the user exists but is not logged in
  const checkUserExists = async (email) => {
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ "email": email, "password": password })
      });
      const res = await response.json();
      if (res.user)
        return true;
      else
        return false;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const verifyPassword = () => {
    return (password === passwordVer);
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault()
    checkUserExists(email).then((exists) => {
      if (exists) {
        manageMassages('User already exists');
      } else {
        if (validateEmail(email)) {
          if (isPassStrong()) {
            if (verifyPassword()) {
              let currentUser = {
                email: email,
                password: CryptoJS.AES.encrypt(passwordVer, KEY, {
                  iv: IV,
                  mode: CryptoJS.mode.CBC,
                  padding: CryptoJS.pad.Pkcs7,
                }).toString(),
                id: -1,
                isRegisterd: false,
              }
              setCurrentUser(currentUser);
              localStorage.removeItem('currentUser');
              navigate('/userDetails');
            }
            else {
              manageMassages('You have to use the same password.Please recheck!');
              setPasswordVer('');
            }
          } else {
            manageMassages('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
            setPassword('');
            setPasswordVer('');
          }
        } else {
          manageMassages('Email not valid!');
          setEmail('');
        }
      }
    });
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h3 className={styles.title}>New Account</h3>
      <div className={styles.steps}><strong>1</strong> / 2 STEPS</div>
      <form className={styles.container} onSubmit={handleRegisterSubmit}>
        <input className={styles.input} type="email" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} required />
        <input className={styles.input} type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} required />
        <input className={styles.input} type="password" placeholder="verify password" onChange={(e) => { setPasswordVer(e.target.value) }} required />
        <div className={styles.alert} >{alertDiv}</div>
        <button className={styles.button} type="submit">submit</button>
        <div className={styles.linkContainer}>Already have an account?</div>
        <Link className={styles.link} to="/login">Login</Link>
      </form>
    </>
  )
}