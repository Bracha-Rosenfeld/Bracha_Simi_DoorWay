import React, { useState } from 'react';
import styles from './loginAndRegister.module.css';
import { useCurrentUser } from '../userProvider';
import { useNavigate, Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertDiv, setAlert] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUser();

  const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
  const IV = CryptoJS.enc.Utf8.parse('6543210987654321');

  const manageMassages = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(''), 5000);
  };

  const checkUserExists = async (email, pass) => {
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(pass, KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString();

      const response = await axios.post(
        'http://localhost:5000/users/login',
        {
          email: email,
          password: encryptedPassword
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      const user = response.data;
      if (user)
        return { ok: true, user: user };
      else
        return { ok: false, user: null };

    } catch (err) {
      if (err.response?.status === 401) {
        setAlert('User does not exist! Try to register!');
      } else {
        setError(err.message);
      }
      return { ok: false, user: null };
    }
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    checkUserExists(email, password).then(({ ok, user }) => {
      if (!ok) {
        manageMassages('User name or password incorrect, try again');
      } else {
        setCurrentUser(user);
        navigate('/');
      }
    });
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.authForm}>
      <div className={styles.container}>
        <h3 className={styles.title}>Welcome Back</h3>
        <div className={styles.divider} data-text="or continue with email"></div>
        <form onSubmit={handleLoginSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <div className={styles.alert}>{alertDiv}</div>
          <button type="submit" className={styles.button}>Sign In</button>
          <GoogleLogin
            width="100%"
            shape="rectangular"
            theme="outline"
            size="large"
            text="signin_with"
            onSuccess={async cred => {
              try {
                const response = await axios.post(
                  'http://localhost:5000/users/google',
                  { idToken: cred.credential },
                  {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                  }
                );
                const user = response.data;
                if (user && user.id) {
                  setCurrentUser(user);
                  navigate('/');
                } else {
                  manageMassages('Google login failed');
                }
              } catch (error) {
                manageMassages('Google login failed');
              }
            }}
            onError={() => manageMassages('Google login failed')}
          />
          <div className={styles.linkContainer}>
            Don't have an account?
            <Link to="/register" className={styles.link}>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}