import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
          <h2 >{apt.title}</h2>
          <p><strong>Address:</strong> {apt.address}</p>
          <p><strong>Price:</strong> {apt.price}</p>
          <p><strong>Rooms:</strong> {apt.num_of_rooms}</p>
          <p><strong>Area:</strong> {apt.area} m²</p>
          <p><strong>Floor:</strong> {apt.floor_number}</p>
          <p><strong>Type:</strong> {apt.type}</p>
          <p><strong>Details:</strong> {apt.details}</p>
        </div>
      ))}
    </div>
  );
}
