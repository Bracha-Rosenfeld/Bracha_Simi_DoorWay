// import React, { useState } from 'react';
// import styles from '../login/login.module.css';
// import { useCurrentUser } from '../userProvider';
// import { useNavigate, Link } from 'react-router-dom'
// import CryptoJS from 'crypto-js';
// import axios from 'axios';
// import { GoogleLogin } from '@react-oauth/google';


// //Login Form
// export default function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [alertDiv, setAlert] = useState('');
//     const navigate = useNavigate();

//     const { currentUser, setCurrentUser, isLoadingUser } = useCurrentUser();
//     const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
//     const IV = CryptoJS.enc.Utf8.parse('6543210987654321');
//     const [error, setError] = useState(null);
//     //update the text in alert div.
//     const manageMassages = (message) => {
//         setAlert(message);
//     }

//     // check if the user exists in the DB.Returns the response status and the user-if exists.
//     const checkUserExists = async (email, pass) => {
//         try {
//             const encryptedPassword = CryptoJS.AES.encrypt(pass, KEY, {
//                 iv: IV,
//                 mode: CryptoJS.mode.CBC,
//                 padding: CryptoJS.pad.Pkcs7,
//             }).toString()

//             const response = await fetch('http://localhost:5000/users/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify({ "email": email, "password": encryptedPassword })
//             })
//             if (!response.ok) {
//                 setAlert('User does not exist! Try to register!');
//                 return { ok: false, user: null };
//             }
//             const user = await response.json();

//             if (user)
//                 return { ok: true, user: user };
//             else
//                 return { ok: false, user: null };
//         } catch (err) {
//             setError(err.message);
//             return { ok: false, user: null };
//         }
//     };

//     const handleLoginSubmit = (event) => {
//         event.preventDefault()
//         checkUserExists(email, password).then(({ ok, user }) => {
//             if (!ok) {
//                 manageMassages('user name or password incorrect, try again');
//             } else {
//                 setCurrentUser(user);
//                 navigate('/')
//             }
//         });
//     }

//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className={styles.loginForm}>
//             <div id="container" className={styles.container}>
//                 <h3 className={styles.title}>Login</h3>
//                 {/* ---- Google Sign‑In ---- */}
//                 <GoogleLogin
//                     width="240"
//                     onSuccess={cred => {
//                         fetch('http://localhost:5000/users/google', {
//                             method: 'POST',
//                             headers: { 'Content-Type': 'application/json' },
//                             credentials: 'include',
//                             body: JSON.stringify({ idToken: cred.credential })
//                         })
//                             .then(res => res.json())
//                             .then(user => {
//                                 if (user && user.id) {             
//                                     setCurrentUser(user);
//                                     navigate('/');
//                                 } else {
//                                     manageMassages('Google login failed');
//                                 }
//                             })
//                             .catch(() => manageMassages('Google login failed'));
//                     }}
//                     onError={() => manageMassages('Google login failed')}
//                 />

//                 <form onSubmit={handleLoginSubmit} className={styles.form}>
//                     <input className={styles.input} type="text" placeholder="email" required onChange={(e) => { setEmail(e.target.value) }} />
//                     <input className={styles.input} type="password" placeholder="password" required onChange={(e) => { setPassword(e.target.value) }} />
//                     <div className={styles.alert} >{alertDiv}</div>
//                     <button type="submit" className={styles.button}>submit</button>
//                     <div className={styles.linkContainer}>
//                         <span>First time? </span>
//                         <Link to="/register" className={styles.link}>Register</Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }


import React, { useState } from 'react';
import styles from '../login/login.module.css';
import { useCurrentUser } from '../userProvider';
import { useNavigate, Link } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

//Login Form
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertDiv, setAlert] = useState('');
    const navigate = useNavigate();

    const { currentUser, setCurrentUser, isLoadingUser } = useCurrentUser();
    const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
    const IV = CryptoJS.enc.Utf8.parse('6543210987654321');
    const [error, setError] = useState(null);

    //update the text in alert div.
    const manageMassages = (message) => {
        setAlert(message);
        // Clear alert after 5 seconds
        setTimeout(() => setAlert(''), 5000);
    }

    // check if the user exists in the DB.Returns the response status and the user-if exists.
    const checkUserExists = async (email, pass) => {
        try {
            const encryptedPassword = CryptoJS.AES.encrypt(pass, KEY, {
                iv: IV,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }).toString()

            const response = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ "email": email, "password": encryptedPassword })
            })
            if (!response.ok) {
                setAlert('User does not exist! Try to register!');
                return { ok: false, user: null };
            }
            const user = await response.json();

            if (user)
                return { ok: true, user: user };
            else
                return { ok: false, user: null };
        } catch (err) {
            setError(err.message);
            return { ok: false, user: null };
        }
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        checkUserExists(email, password).then(({ ok, user }) => {
            if (!ok) {
                manageMassages('Username or password incorrect, try again');
            } else {
                setCurrentUser(user);
                navigate('/')
            }
        });
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.loginForm}>
            <div id="container" className={styles.container}>
                <h3 className={styles.title}>Welcome Back</h3>

                {/* ---- Google Sign‑In ---- */}
                <GoogleLogin
                    width="100%"
                    shape="rectangular"
                    theme="outline"
                    size="large"
                    text="signin_with"
                    onSuccess={cred => {
                        fetch('http://localhost:5000/users/google', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                            body: JSON.stringify({ idToken: cred.credential })
                        })
                            .then(res => res.json())
                            .then(user => {
                                if (user && user.id) {
                                    setCurrentUser(user);
                                    navigate('/');
                                } else {
                                    manageMassages('Google login failed');
                                }
                            })
                            .catch(() => manageMassages('Google login failed'));
                    }}
                    onError={() => manageMassages('Google login failed')}
                />

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
                    <div className={styles.linkContainer}>
                        <span>Don't have an account? </span>
                        <Link to="/register" className={styles.link}>Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}