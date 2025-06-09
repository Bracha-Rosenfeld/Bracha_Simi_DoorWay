// import React, { useState, useRef, useEffect } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom'
// import { useCurrentUser } from '../userProvider';
// import styles from './userDetails.module.css'
// // Some more details
// const userDetails = () => {
//   const [username, setUsername] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [alertDiv, setAlert] = useState('');
//   const [error, setError] = useState(null);
//   const { currentUser, setCurrentUser } = useCurrentUser();
//   const navigate = useNavigate();
//   const firstLoad = useRef(true);

//   if (firstLoad.current) {
//     firstLoad.current = false;
//     if (localStorage.getItem('currentUser')) {
//       alert('You cannot change your details after signing up!');
//       return <Navigate to='/login' />
//     }
//   }

//   //update the text in alert div.
//   const manageMassages = (message) => {
//     setAlert(message);
//   }



//   //checks if the phone number is valid.
//   const validatePhone = (phone) => {
//     const phoneRegex = /^\+?[0-9]{1,3}?[-\s]?[0-9]{9,12}$/;
//     return phoneRegex.test(phone);
//   };

//   //Complete the register process. 
//   const writeUserToDB = async () => {
//     let newUser = {
//       username: username,
//       email: currentUser.email,
//       phone: phone,
//       address: address,
//       password: currentUser.password,
//       role_name:'publisher'
//     }
//     try {
//       const response = await fetch('http://localhost:5000/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newUser)
//       })
//       if (!response.ok)
//         throw new Error(`Error: ${response.status}`);
//       setCurrentUser({ id: newUser.id, username: newUser.username, email: newUser.email, phone: newUser.phone, address: newUser.address });
//       localStorage.setItem('currentUser', JSON.stringify({ id: newUser.id, username: newUser.username, email: newUser.email, phone: newUser.phone, address: newUser.address }));
//       navigate('/myAccount');
//     } catch (err) {
//       setError(err.message);
//     }
//   }
//   //Check the details' validation.
//   const handleDetailsSubmit = (event) => {
//     event.preventDefault()
//     if (!validatePhone(phone)) {//if only phone not valid
//       manageMassages("phone not valid!");
//       setPhone('');
//     }
//     else {
//       writeUserToDB();
//     }
//   }
//   if (error) {
//     return <div className={styles.error}>Error: {error}</div>;
//   }
//   return (
//     <>
//       <h3 className={styles.title}>More Details</h3>
//       <div className={styles.steps}><strong>2</strong> / 2 STEPS</div>
//       <form className={styles.form} onSubmit={handleDetailsSubmit}>
//         <input className={styles.input} type="text" placeholder="username" onChange={(e) => { setUsername(e.target.value) }} required />
//         <input className={styles.input} type="tel" placeholder="phone number"  onChange={(e) => { setPhone(e.target.value) }} required />
//         <input className={styles.input} type="text" placeholder="address"  onChange={(e) => { setAddress(e.target.value) }} required />
//         <div className={styles.alert} >{alertDiv}</div>
//         <button className={styles.button} type="submit">submit</button>
//       </form>

//     </>
//   )
// }

// export default userDetails;
import React, { useState, useRef, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../userProvider';
import styles from './userDetails.module.css'

const userDetails = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [alertDiv, setAlert] = useState('');
  const [error, setError] = useState(null);
  const { currentUser, setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      // Check if user is already authenticated via cookie
      if (currentUser && currentUser.id !== -1 && isRegistered) {
        alert('You cannot change your details after signing up!');
        navigate('/login');
      }
    }
  }, [currentUser, navigate]);

  const manageMassages = (message) => {
    setAlert(message);
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[0-9]{1,3}?[-\s]?[0-9]{9,12}$/;
    return phoneRegex.test(phone);
  };

  const writeUserToDB = async () => {
    let newUser = {
      username: username,
      email: currentUser.email,
      phone: phone,
      address: address,
      password: currentUser.password,
      role_name: 'publisher'
    }
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newUser)
      })
      if (!response.ok)
        throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setCurrentUser({ id: data.id, username: data.username, email: data.email, phone: data.phone, address: data.address });
      navigate('/myAccount');
    } catch (err) {
      setError(err.message);
    }
  }

  const handleDetailsSubmit = (event) => {
    event.preventDefault()
    if (!validatePhone(phone)) {
      manageMassages("phone not valid!");
      setPhone('');
    }
    else {
      writeUserToDB();
    }
  }
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }
  return (
    <>
      <h3 className={styles.title}>More Details</h3>
      <div className={styles.steps}><strong>2</strong> / 2 STEPS</div>
      <form className={styles.form} onSubmit={handleDetailsSubmit}>
        <input className={styles.input} type="text" placeholder="username" onChange={(e) => { setUsername(e.target.value) }} required />
        <input className={styles.input} type="tel" placeholder="phone number" onChange={(e) => { setPhone(e.target.value) }} required />
        <input className={styles.input} type="text" placeholder="address" onChange={(e) => { setAddress(e.target.value) }} required />
        <div className={styles.alert} >{alertDiv}</div>
        <button className={styles.button} type="submit">submit</button>
      </form>
    </>
  )
}

export default userDetails;