import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../components/userProvider'
import axios from 'axios';

export default function publishApartment() {
  const { currentUser, isLoadingUser } = useCurrentUser();
  const [wasAdded, setWasAdded] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    publisher_id: null,
    address: '',
    price: '',
    type: 'rent',
    title: '',
    num_of_rooms: '',
    area: '',
    floor_number: '',
    details: '',
    is_approved: false,
    image_url: ''
  });

  useEffect(() => {
    if (isLoadingUser) return;
    if (currentUser && currentUser.id !== -1)
      setFormData((prevData) => ({
        ...prevData,
        publisher_id: currentUser.id
      }));
  }, [currentUser, isLoadingUser])


  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    if (imageFile) {
      form.append('image', imageFile);
    }
    try {
      let newApartment;
      if (imageFile) {
        const uploadRes = await axios.post('http://localhost:5000/upload/uploadImage', form, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const imageUrl = uploadRes.data.imageUrl;
        setFormData((prevData) => ({
          ...prevData, image_url: imageUrl
        }));
        newApartment = { ...formData, image_url: imageUrl }
      } else {
        newApartment = formData;
      }
      const res = await fetch('http://localhost:5000/apartments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newApartment)
      });
      if (!res.ok) throw new Error('Failed to add apartment');
      setWasAdded(true);
      setImageFile(null);
      setFormData({
        address: '',
        price: '',
        type: 'rent',
        title: '',
        num_of_rooms: '',
        area: '',
        floor_number: '',
        details: '',
        is_approved: false,
        image_url: ''
      });
    setWasAdded(true);
    } catch (error) {
      setError('An error occurred while adding the apartment' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (wasAdded === true) {
    return (
      <>
        <div>Apartment was added successfully!</div>
        <Link to="/">home</Link>
      </>
    );
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
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">publish</button>
      </form>
    </>
  );
}
