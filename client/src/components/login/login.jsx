import React, { useEffect, useState } from 'react';
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

    // Check if already logged in via cookie, only in the first load and not every time the currentUser changes.
    useEffect(() => {
        if (isLoadingUser) return; // Wait for the user to load

        if (currentUser && currentUser.id !== -1) {
            navigate('/myAccount');
        }
    }, [navigate, currentUser, isLoadingUser]);

    //update the text in alert div.
    const manageMassages = (message) => {
        setAlert(message);
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

    //if the user is valid - navigate to home page.
    const handleLoginSubmit = (event) => {
        event.preventDefault()
        checkUserExists(email, password).then((exists) => {
            if (!exists.ok) {
                manageMassages('user name or password incorrect, try again');
            } else {
                let currentUser = {
                    id: exists.user.id,
                    username: exists.user.username,
                    email: exists.user.email,
                }
                setCurrentUser(currentUser);
                const roles = axios.get(`http://localhost:5000/users/${exists.user.id}/roles`, {
                    withCredentials: true
                }).then((response) => {
                    if (response.data && response.data.length > 0) {
                        if (response.data.includes('admin')) {
                            navigate('/adminHome');
                        } else {
                            navigate('/');
                        }
                    } else {
                        navigate('/login');
                    }
                }).catch((error) => {
                    setError('Error fetching user roles:', error);
                    navigate('/'); // Fallback to myAccount if roles fetch fails
                });
            }
        });
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.loginForm}>
            <div id="container" className={styles.container}>
                <h3 className={styles.title}>Login</h3>
                {/* ---- Google Sign‑In ---- */}
                <GoogleLogin
                    width="240"
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
                                    setCurrentUser({ id: user.id, username: user.username, email: user.email });
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
                    <input className={styles.input} type="text" placeholder="email" required onChange={(e) => { setEmail(e.target.value) }} />
                    <input className={styles.input} type="password" placeholder="password" required onChange={(e) => { setPassword(e.target.value) }} />
                    <div className={styles.alert} >{alertDiv}</div>
                    <button type="submit" className={styles.button}>submit</button>
                    <div className={styles.linkContainer}>
                        <span>First time? </span>
                        <Link to="/register" className={styles.link}>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}