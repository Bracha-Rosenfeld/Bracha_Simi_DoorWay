import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../userProvider';
import styles from './loginAndRegister.module.css';

const CompleteRegister = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [alertDiv, setAlert] = useState('');
  const [error, setError] = useState(null);
  const { currentUser, setCurrentUser, isLoadingUser } = useCurrentUser();
  const navigate = useNavigate();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      if (isLoadingUser) return;
      // Check if user is already authenticated via cookie
      if (currentUser && currentUser.id !== -1 && currentUser.isRegisterd) {
        alert('You cannot change your details after signing up!');
        navigate('/login');
      }
    }
  }, [currentUser, isLoadingUser, navigate]);

  const manageMassages = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(''), 5000);
  };

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
    };
    try {
      const response = await axios.post('http://localhost:5000/users', newUser, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      const data = response.data;
      setCurrentUser({ id: data.id, username: data.username, email: data.email, phone: data.phone, address: data.address });
      navigate('/myAccount');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDetailsSubmit = (event) => {
    event.preventDefault();
    if (!validatePhone(phone)) {
      manageMassages("Phone not valid!");
      setPhone('');
    } else {
      writeUserToDB();
    }
  };

  if (error) {
    return <div className={styles.alert}>Error: {error}</div>;
  }

  return (
    <div className={styles.authForm}>
      <div className={styles.container}>
        <h3 className={styles.title}>More Details</h3>
        <div className={styles.steps}><strong>2</strong> / 2 Steps</div>
        <form className={styles.form} onSubmit={handleDetailsSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
            required
          />
          <input
            className={styles.input}
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => { setPhone(e.target.value) }}
            required
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => { setAddress(e.target.value) }}
            required
          />
          <div className={styles.alert}>{alertDiv}</div>
          <button className={styles.button} type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CompleteRegister;