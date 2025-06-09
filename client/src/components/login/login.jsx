// import React, { useEffect, useRef, useState } from 'react';
// import styles from '../login/login.module.css';
// import { useCurrentUser } from '../userProvider';
// import { useNavigate, Link } from 'react-router-dom'
// import CryptoJS from 'crypto-js';
// //Login Form
// export default function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [alertDiv, setAlert] = useState('');
//     const navigate = useNavigate();
//     const { setCurrentUser } = useCurrentUser();
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

//     //if the user is valid - navigate to home page.
//     const handleLoginSubmit = (event) => {
//         event.preventDefault()
//         checkUserExists(email, password).then((exists) => {
//             if (!exists.ok) {
//                 manageMassages('user name or password incorrect, try again');
//             } else {
//                 let currentUser = {
//                     id: exists.user.id,
//                     username: exists.user.username,
//                     email: exists.user.email,
//                 }
//                 localStorage.setItem('currentUser', JSON.stringify(currentUser));
//                 setCurrentUser(currentUser);
//                 navigate('/myAccount');
//             }
//         });
//     }

//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className={styles.loginForm}>
//             <div id="container" className={styles.container}>
//                 <h3 className={styles.title}>Login</h3>
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
import React, { useEffect, useState } from 'react';
import styles from '../login/login.module.css';
import { useCurrentUser } from '../userProvider';
import { useNavigate, Link } from 'react-router-dom'
import CryptoJS from 'crypto-js';

//Login Form
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertDiv, setAlert] = useState('');
    const navigate = useNavigate();
    const { currentUser,setCurrentUser } = useCurrentUser();
    const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
    const IV = CryptoJS.enc.Utf8.parse('6543210987654321');
    const [error, setError] = useState(null);

    // Check if already logged in via cookie
    useEffect(() => {
        if (currentUser && currentUser.id !== -1) {
            navigate('/myAccount');
        }
    }, [currentUser, navigate]);

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
                navigate('/myAccount');
            }
        });
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.loginForm}>
            <div id="container" className={styles.container}>
                <h3 className={styles.title}>Login</h3>
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