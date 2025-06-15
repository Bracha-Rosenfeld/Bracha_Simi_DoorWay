import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useCurrentUser } from './userProvider';
const apartmentDetails = ({ apt }) => {
  const [error, setError] = useState('');
 if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
      <h2><strong>{apt.title}</strong> </h2>
      <p><strong>address:</strong> {apt.address}</p>
      <p><strong>price:</strong> {apt.price} ₪</p>
      <p><strong>size:</strong> {apt.area} m²</p>
      <p><strong>rooms:</strong> {apt.num_of_rooms}</p>
      <p><strong>floor:</strong> {apt.floor_number}</p>
      <p> <strong>{apt.type == 'rent' ? 'for rent' : 'for sale'}</strong> </p>
      <p><strong>description:</strong> {apt.details}</p>
      {apt.image_url && (
        <img
          src={`http://localhost:5000${apt.image_url}`}
          alt={apt.title}
          style={{ maxWidth: '300px', maxHeight: '200px', objectFit: 'cover', borderRadius: '10px' }}
        />
      )}
    </div>
  )
}

export default apartmentDetails