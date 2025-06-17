import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCurrentUser } from '../userProvider';
import CryptoJS from 'crypto-js';
import styles from './loginAndRegister.module.css';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVer, setPasswordVer] = useState('');
  const [alertDiv, setAlert] = useState('');
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUser();

  const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
  const IV = CryptoJS.enc.Utf8.parse('6543210987654321');

  const manageMassages = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(''), 5000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = () => [
    { label: 'At least 8 characters', test: password.length >= 8 },
    { label: 'One uppercase letter', test: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', test: /[a-z]/.test(password) },
    { label: 'One number', test: /[0-9]/.test(password) },
    { label: 'One special character', test: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const isPassStrong = () => getPasswordStrength().every(req => req.test);

  const checkUserExists = async (email) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/users/login',
        {
          email: email,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      const res = response.data;
      if (res.user)
        return true;
      else
        return false;

    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const verifyPassword = () => password === passwordVer;

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
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
              };
              setCurrentUser(currentUser);
              localStorage.removeItem('currentUser');
              navigate('/userDetails');
            } else {
              manageMassages('You have to use the same password. Please recheck!');
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
  };

  const handleGoogleSuccess = async ({ credential }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/users/google',
        { idToken: credential },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      const user = response.data;
      setCurrentUser({ id: user.id, username: user.username, email: user.email });
      navigate('/');

    } catch (e) {
      setError(e.message);
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.authForm}>
      <div className={styles.container}>
        <h3 className={styles.title}>Create Account</h3>
        <div className={styles.divider} data-text="or continue with email"></div>
        <div className={styles.steps}><strong>1</strong> / 2 Steps</div>
        <form className={styles.form} onSubmit={handleRegisterSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setShowPasswordStrength(true); }}
            onFocus={() => setShowPasswordStrength(true)}
            required
          />
          {showPasswordStrength && password && (
            <div className={styles.passwordStrength}>
              <ul>
                {getPasswordStrength().map((req, index) => (
                  <li key={index} className={req.test ? styles.valid : ''}>
                    {req.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <input
            className={styles.input}
            type="password"
            placeholder="Confirm password"
            value={passwordVer}
            onChange={(e) => setPasswordVer(e.target.value)}
            required
          />
          <div className={styles.alert}>{alertDiv}</div>
          <button
            className={styles.button}
            type="submit"
            disabled={!email || !password || !passwordVer}
          >
            Create Account
          </button>
          <div className="google-button-container">
            <GoogleLogin
              width="100%"
              shape="rectangular"
              theme="outline"
              size="large"
              text="signup_with"
              onSuccess={handleGoogleSuccess}
              onError={() => manageMassages('Google registration failed')}
            />
          </div>
          <div className={styles.linkContainer}>
            Already have an account?
            <Link className={styles.link} to="/login">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}