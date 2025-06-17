import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../userProvider'
import axios from 'axios';
import styles from './PublishApartment.module.css';

export default function PublishApartment() {
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
      setError('An error occurred while adding the apartment: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (wasAdded === true) {
    return (
      <div className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.successTitle}>
            🎉 Success!
          </div>
          <p className={styles.successText}>
            Your apartment has been submitted successfully and is pending approval.
          </p>
          <Link to="/" className={styles.homeLink}>
            🏠 Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Publish Your Apartment</h1>
        <p className={styles.subtitle}>
          Share your property with potential tenants and buyers
        </p>
      </div>

      {error && <div className={styles.error}>⚠️ {error}</div>}
      
      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Property Title</label>
            <input 
              name="title" 
              placeholder="e.g., Spacious 2BR Downtown Apartment"
              onChange={handleChange}
              value={formData.title}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Address</label>
            <input 
              name="address" 
              placeholder="Full property address"
              onChange={handleChange}
              value={formData.address}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.twoColumn}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Price</label>
              <input 
                name="price" 
                placeholder="Monthly rent or sale price"
                onChange={handleChange}
                value={formData.price}
                className={styles.input}
                type="number"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Listing Type</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange}
                className={styles.select}
              >
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
            </div>
          </div>

          <div className={styles.twoColumn}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Number of Rooms</label>
              <input 
                name="num_of_rooms" 
                placeholder="e.g., 3"
                onChange={handleChange}
                value={formData.num_of_rooms}
                className={styles.input}
                type="number"
                min="1"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Area (sq ft)</label>
              <input 
                name="area" 
                placeholder="e.g., 850"
                onChange={handleChange}
                value={formData.area}
                className={styles.input}
                type="number"
                min="1"
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Floor Number</label>
            <input 
              name="floor_number" 
              placeholder="e.g., 3rd floor"
              onChange={handleChange}
              value={formData.floor_number}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Property Details</label>
            <textarea 
              name="details" 
              placeholder="Describe your property features, amenities, nearby attractions..."
              onChange={handleChange}
              value={formData.details}
              className={styles.textarea}
              rows="4"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Property Image</label>
            <div className={styles.fileInput}>
              <input 
                type="file" 
                onChange={handleFileChange} 
                accept="image/*"
              />
              <div className={styles.fileInputText}>
                📷 {imageFile ? imageFile.name : 'Click to upload property photo'}
              </div>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            🚀 Publish Apartment
          </button>
        </form>
      </div>
    </div>
  );
}