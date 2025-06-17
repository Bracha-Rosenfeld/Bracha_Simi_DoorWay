// // Example: Add this function to any component where you want to allow logout
// import { useCurrentUser } from './userProvider';
// import { useNavigate } from 'react-router-dom';

// function LogoutButton() {
//   const { setCurrentUser } = useCurrentUser();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await fetch('http://localhost:5000/users/logout', {
//       method: 'POST',
//       credentials: 'include'
//     });
//     setCurrentUser(null);
//     navigate('/login');
//   };

//   return <button onClick={handleLogout}>Logout</button>;
// }

// export default LogoutButton;

import { useCurrentUser } from '../userProvider';
import { useNavigate } from 'react-router-dom';
import styles from './userAccount.module.css';

function LogoutButton() {
  const { setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('http://localhost:5000/users/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <button 
      className={styles.logoutButton} 
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;