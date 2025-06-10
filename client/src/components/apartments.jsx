import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApartmentDetails from './apartmentDetails';
export default function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/apartments?is_approved=${true}`, {
          withCredentials: true,
        });
        setApartments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load apartments');
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  if (loading) return <div>Loading apartments...</div>;
  if (error) return <div>{error}</div>;

  if (apartments.length === 0) {
    return <div>No apartments found.</div>;
  }

  return (
    <div >
      {apartments.map((apt) => (
        <div key={apt.id} >
          <ApartmentDetails apt={apt} />
        </div>
      ))}
    </div>
  );
}
