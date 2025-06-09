import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../components/userProvider'
import axios from 'axios';

export default function publishApartment() {
  const { currentUser } = useCurrentUser();
  const [wasAdded, setWasAdded] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    publisher_id: currentUser.id,
    address: '',
    price: '',
    type: 'rent',
    title: '',
    num_of_rooms: '',
    area: '',
    floor_number: '',
    details: '',
    is_approved: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/apartments?is_approved=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        setError('Failed to add apartment');
      }
      setFormData({
        address: '',
        price: '',
        type: 'rent',
        title: '',
        num_of_rooms: '',
        area: '',
        floor_number: '',
        details: '',
        is_approved: false
      });
      setWasAdded(true);
    } catch (error) {
      setError('An error occurred while adding the apartment' + error.message);
    }
  };

  if (wasAdded) {
    return <div>Apartment was added successfully!</div>;
    <Link to="/">home</Link>
  }

  return (
    <>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="p-4 space-y-2">
        <input name="title" placeholder="title" onChange={handleChange} />
        <input name="address" placeholder="address" onChange={handleChange} />
        <input name="price" placeholder="price" onChange={handleChange} />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="rent">rent</option>
          <option value="sale">sale</option>
        </select>
        <input name="num_of_rooms" placeholder="room number" onChange={handleChange} />
        <input name="area" placeholder="area" onChange={handleChange} />
        <input name="floor_number" placeholder="floor number" onChange={handleChange} />
        <textarea name="details" placeholder="details" onChange={handleChange} />
        <button type="submit">publish</button>
      </form>
    </>
  );
}
