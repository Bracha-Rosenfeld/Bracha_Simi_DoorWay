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
  const { setCurrentUser } = useCurrentUser();
  const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
  const IV = CryptoJS.enc.Utf8.parse('6543210987654321');
  const [error, setError] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  //make sure to clear local storage(-prevent getting back to user details with the browse arrows.)
  useEffect(() => {
    if (isFirstLoad) {
      localStorage.removeItem('currentUser');
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);
  //update the text in alert div.
  const manageMassages = (message) => {
    setAlert(message);
  }
  //checks if the email address is valid.
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Password validation
  const isPassStrong = () => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  //check if the user exists in the DB.
  const checkUserExists = async (email) => {
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "email": email, "password": password })
      });
      // if (!response.ok) {
      //   throw new Error('Failed to fetch data from Server');
      // }
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
  //check if the feild 'verify password' matches.
  const verifyPassword = () => {
    return (password === passwordVer);
  }

  //a function which checks the validation of the user.
  const handleRegisterSubmit = (event) => {
    event.preventDefault()
    checkUserExists(email).then((exists) => {
      if (exists) {
        manageMassages('User already exists');
      } else {
        if (validateEmail(email)) {//if email not valid
          if (isPassStrong()) {
            if (verifyPassword()) {
              let currentUser = {
                email: email,
                password: CryptoJS.AES.encrypt(passwordVer, KEY, {
                  iv: IV,
                  mode: CryptoJS.mode.CBC,
                  padding: CryptoJS.pad.Pkcs7,
                }).toString()
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