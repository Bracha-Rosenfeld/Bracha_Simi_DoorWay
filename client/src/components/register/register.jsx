import React, { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { useCurrentUser } from '../userProvider';
import CryptoJS from 'crypto-js';
import styles from './register.module.css'

// Sign Up Form
export default function Register() {
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [passwordVer,setPasswordVer] = useState('');
  const [alertDiv,setAlert] = useState('');
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
    alertDiv.current.innerText = message;
  }
  //check if the user exists in the DB.
  const checkUserExists = async (username) => {
    try {
      const response = await fetch(`http://localhost:3000/users?username=${username}&_exact=true`);
      if (!response.ok) {
        throw new Error('Failed to fetch data from JSON Server');
      }
      const users = await response.json();

      if (users.length > 0)
        return true;
      else
        return false;
    } catch (error) {
      setError(err.message);
      return false;
    }
  };
  //check if the feild 'verify password' matches.
  const verifyPassword = () => {
    return (password.current.value === passwordVer.current.value);
  }

  //a function which checks the validation of the user.
  const handleRegisterSubmit = (event) => {
    event.preventDefault()
    checkUserExists(name.current.value).then((exists) => {
      if (exists) {
        manageMassages('User already exists');
      } else {
        if (verifyPassword()) {
          let currentUser = {
            username: name.current.value,
            website: CryptoJS.AES.encrypt(passwordVer.current.value, KEY, {
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
          passwordVer.current.value = '';
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
        <input className={styles.input}  type="text" placeholder="name" required onChange={(e)=>{setName(e.target.value)}}/>
        <input className={styles.input}  type="password" placeholder="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
        <input className={styles.input}  type="password" placeholder="verify password" required onChange={(e)=>{setPasswordVer(e.target.value)}}/>
        <div className={styles.alert} innertext={alertDiv}></div>
        <button className={styles.button} type="submit">submit</button>
        <div className={styles.linkContainer}>Already have an account?</div>
        <Link className={styles.link} to="/login">Login</Link>
      </form>

    </>
  )
}