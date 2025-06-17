// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom'
// import { useCurrentUser } from '../userProvider';
// import CryptoJS from 'crypto-js';
// import styles from './register.module.css'
// import { GoogleLogin } from '@react-oauth/google';

// // Sign Up Form
// export default function Register() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordVer, setPasswordVer] = useState('');
//   const [alertDiv, setAlert] = useState('');
//   const navigate = useNavigate();
//   const { currentUser, setCurrentUser, isLoadingUser } = useCurrentUser();
//   const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
//   const IV = CryptoJS.enc.Utf8.parse('6543210987654321');
//   const [error, setError] = useState(null);
//   const manageMassages = (message) => {
//     setAlert(message);
//   }
//   const validateEmail = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email);
//   };

//   const isPassStrong = () => {
//     return (
//       password.length >= 8 &&
//       /[A-Z]/.test(password) &&
//       /[a-z]/.test(password) &&
//       /[0-9]/.test(password) &&
//       /[!@#$%^&*(),.?":{}|<>]/.test(password)
//     );
//   };
//   //the user exists but is not logged in
//   const checkUserExists = async (email) => {
//     try {
//       const response = await fetch('http://localhost:5000/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         credentials: 'include',
//         body: JSON.stringify({ "email": email, "password": password })
//       });
//       const res = await response.json();
//       if (res.user)
//         return true;
//       else
//         return false;
//     } catch (err) {
//       setError(err.message);
//       return false;
//     }
//   };

//   const verifyPassword = () => {
//     return (password === passwordVer);
//   }

//   const handleRegisterSubmit = (event) => {
//     event.preventDefault()
//     checkUserExists(email).then((exists) => {
//       if (exists) {
//         manageMassages('User already exists');
//       } else {
//         if (validateEmail(email)) {
//           if (isPassStrong()) {
//             if (verifyPassword()) {
//               let currentUser = {
//                 email: email,
//                 password: CryptoJS.AES.encrypt(passwordVer, KEY, {
//                   iv: IV,
//                   mode: CryptoJS.mode.CBC,
//                   padding: CryptoJS.pad.Pkcs7,
//                 }).toString(),
//                 id: -1,
//                 isRegisterd: false,
//               }
//               setCurrentUser(currentUser);
//               localStorage.removeItem('currentUser');
//               navigate('/userDetails');
//             }
//             else {
//               manageMassages('You have to use the same password.Please recheck!');
//               setPasswordVer('');
//             }
//           } else {
//             manageMassages('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
//             setPassword('');
//             setPasswordVer('');
//           }
//         } else {
//           manageMassages('Email not valid!');
//           setEmail('');
//         }
//       }
//     });
//   }
//   const handleGoogleSuccess = async ({ credential }) => {
//     try {
//       const res = await fetch('http://localhost:5000/users/google', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         //body: JSON.stringify({ token: credential })
//         body: JSON.stringify({ idToken: credential })
//       });
//       if (!res.ok) throw new Error('Google signup failed');
//       const user = await res.json();
//       setCurrentUser({ id: user.id, username: user.username, email: user.email });
//       navigate('/');
//     } catch (e) {
//       setError(e.message);
//     }
//   };
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <h3 className={styles.title}>New Account</h3>
//       <GoogleLogin
//         width="280"
//         text="signup_with"
//         onSuccess={handleGoogleSuccess}
//         onError={() => manageMassages('Google registration failed')}
//       //useOneTap
//       />

//       <div className={styles.divider}>or create account with email</div>
//       <div className={styles.steps}><strong>1</strong> / 2 STEPS</div>
//       <form className={styles.container} onSubmit={handleRegisterSubmit}>
//         <input className={styles.input} type="email" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} required />
//         <input className={styles.input} type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} required />
//         <input className={styles.input} type="password" placeholder="verify password" onChange={(e) => { setPasswordVer(e.target.value) }} required />
//         <div className={styles.alert} >{alertDiv}</div>
//         <button className={styles.button} type="submit">submit</button>
//         <div className={styles.linkContainer}>Already have an account?</div>
//         <Link className={styles.link} to="/login">Login</Link>
//       </form>
//     </>
//   )
// }
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { useCurrentUser } from '../userProvider';
import CryptoJS from 'crypto-js';
import styles from './register.module.css'
import { GoogleLogin } from '@react-oauth/google';

// Sign Up Form
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVer, setPasswordVer] = useState('');
  const [alertDiv, setAlert] = useState('');
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, isLoadingUser } = useCurrentUser();
  const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
  const IV = CryptoJS.enc.Utf8.parse('6543210987654321');
  const [error, setError] = useState(null);
  
  const manageMassages = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(''), 5000);
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = () => {
    const requirements = [
      { test: password.length >= 8, label: '8+ chars' },
      { test: /[A-Z]/.test(password), label: 'Uppercase' },
      { test: /[a-z]/.test(password), label: 'Lowercase' },
      { test: /[0-9]/.test(password), label: 'Number' },
      { test: /[!@#$%^&*(),.?":{}|<>]/.test(password), label: 'Special' }
    ];
    return requirements;
  };

  const isPassStrong = () => {
    return getPasswordStrength().every(req => req.test);
  };

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
            } else {
              manageMassages('Passwords do not match');
              setPasswordVer('');
            }
          } else {
            manageMassages('Password must meet all requirements');
            setPassword('');
            setPasswordVer('');
          }
        } else {
          manageMassages('Please enter a valid email address');
          setEmail('');
        }
      }
    });
  }

  const handleGoogleSuccess = async ({ credential }) => {
    try {
      const res = await fetch('http://localhost:5000/users/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken: credential })
      });
      if (!res.ok) throw new Error('Google signup failed');
      const user = await res.json();
      setCurrentUser({ id: user.id, username: user.username, email: user.email });
      navigate('/');
    } catch (e) {
      manageMassages('Google registration failed');
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.registerForm}>
      <div className={styles.container}>
        <h3 className={styles.title}>Create Account</h3>
        
        <GoogleLogin
          width="100%"
          shape="rectangular"
          theme="outline"
          size="large"
          text="signup_with"
          onSuccess={handleGoogleSuccess}
          onError={() => manageMassages('Google registration failed')}
        />

        <div className={styles.divider} data-text="or continue with email"> </div>
        
        <div className={styles.steps}> <strong>1</strong> / 2 Steps </div>

        <form onSubmit={handleRegisterSubmit}>
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
            onChange={(e) => {
              setPassword(e.target.value);
              setShowPasswordStrength(e.target.value.length > 0);
            }}
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

          <div className={styles.alert}>
            {alertDiv}
          </div>
          
          <button 
            className={styles.button} 
            type="submit"
            disabled={!email || !password || !passwordVer}
          >
            Create Account
          </button>
          
          <div className={styles.linkContainer}>
            Already have an account?
            <Link className={styles.link} to="/login">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}