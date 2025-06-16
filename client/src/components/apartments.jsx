// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AddToCartButton from './addToCartButton';
// import ApartmentDetails from './apartmentDetails';
// export default function Apartments() {
//   const [error, setError] = useState('');
//   const [cityFilter, setCityFilter] = useState('');
//   const [typeFilter, setTypeFilter] = useState('');
//   const [cities, setCities] = useState([]);
//   const [types, setTypes] = useState(['rent', 'sale']);
//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const LIMIT = 10;

//   useEffect(() => {
//     const fetchFilters = async () => {

//       setCities([...new Set(apartments.map((apt) => apt.city))]);
//     };

//     fetchFilters();
//   }, [apartments]);

//   useEffect(() => {
//     fetchApartments();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop + 100 >=
//         document.documentElement.offsetHeight
//       ) {
//         fetchApartments();
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [offset, loading, hasMore]);

//   const fetchApartments = async () => {
//     if (loading || !hasMore) return;
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/apartments?is_approved=${true}&limit=${LIMIT}&offset=${offset}`, {
//         withCredentials: true,
//       });
//       const data = response.data;
//       console.log("data: ",data);
      
//       if (data.length < LIMIT) setHasMore(false);
//       setApartments(prev => [...prev, ...data]);
//       setOffset(prev => prev + LIMIT);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to load apartments');
//       setLoading(false);
//     }
//   };

//   const filteredApartments = apartments.filter((apt) => {
//     return (
//       (cityFilter === '' || apt.city === cityFilter) &&
//       (typeFilter === '' || apt.type === typeFilter)
//     );
//   });

//   if (loading) return <div>Loading apartments...</div>;
//   if (error) return <div>{error}</div>;

//   if (apartments.length === 0) {
//     return <div>No apartments found.</div>;
//   }

//   return (
//     <div>
//       {/* ⭐️ **הוספה: ממשק סינון לפי עיר וסוג** */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label>
//           Filter by city:
//           <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
//             <option value="">All</option>
//             {cities.map((city) => (
//               <option key={city} value={city}>{city}</option>
//             ))}
//           </select>
//         </label>

//         <label style={{ marginLeft: '1rem' }}>
//           Filter by type:
//           <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
//             <option value="">All</option>
//             {types.map((type) => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//         </label>
//       </div>

//       {/* ⭐️ **החלפה: שימוש בדירות המסוננות** */}
//       {filteredApartments.length === 0 ? (
//         <div>No apartments found.</div>
//       ) : (
//         filteredApartments.map((apt) => (
//           <div key={apt.id}>
//             <ApartmentDetails apt={apt} />
//             <AddToCartButton aptId={apt.id} />
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddToCartButton from './addToCartButton';
import ApartmentDetails from './apartmentDetails';
import styles from './apartments.module.css'

export default function Apartments() {
  const [error, setError] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [cities, setCities] = useState([]);
  const [types, setTypes] = useState(['rent', 'sale']);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 10;

  useEffect(() => {
    const fetchFilters = async () => {
      setCities([...new Set(apartments.map((apt) => apt.city))]);
    };
    fetchFilters();
  }, [apartments]);

  useEffect(() => {
    fetchApartments();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        fetchApartments();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset, loading, hasMore]);

  const fetchApartments = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/apartments?is_approved=${true}&limit=${LIMIT}&offset=${offset}`, {
        withCredentials: true,
      });
      const data = response.data;
      console.log("data: ", data);
     
      if (data.length < LIMIT) setHasMore(false);
      setApartments(prev => [...prev, ...data]);
      setOffset(prev => prev + LIMIT);
      setLoading(false);
    } catch (err) {
      setError('Failed to load apartments');
      setLoading(false);
    }
  };

  const filteredApartments = apartments.filter((apt) => {
    return (
      (cityFilter === '' || apt.city === cityFilter) &&
      (typeFilter === '' || apt.type === typeFilter)
    );
  });

  if (loading && apartments.length === 0) {
    return <div className={styles.loadingMessage}>Loading apartments...</div>;
  }
  
  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <div className={styles.apartmentsContainer}>
      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filter by city:</label>
          <select 
            className={styles.filterSelect}
            value={cityFilter} 
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filter by type:</label>
          <select 
            className={styles.filterSelect}
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type === 'rent' ? 'For Rent' : 'For Sale'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredApartments.length === 0 ? (
        <div className={styles.noResults}>No apartments found matching your criteria.</div>
      ) : (
        filteredApartments.map((apt) => (
          <div key={apt.id}>
            <ApartmentDetails apt={apt} />
            <AddToCartButton aptId={apt.id} />
          </div>
        ))
      )}
      
      {loading && <div className={styles.loadingMessage}>Loading more apartments...</div>}
    </div>
  );
}