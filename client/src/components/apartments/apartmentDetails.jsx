import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './apartments.module.css'

const ApartmentDetails = ({ apt }) => {
  const [error, setError] = useState('');
  
  if (error) {
    return <div className={styles.errorMessage}>Error: {error}</div>;
  }
  
  return (
    <div className={styles.apartmentCard}>
      <div className={styles.apartmentContent}>
        <h2 className={styles.apartmentTitle}>{apt.title}</h2>
        
        <div className={styles.priceTag}>
          {apt.price} ₪
        </div>
        
        <span className={styles.typeTag}>
          {apt.type === 'rent' ? 'for rent' : 'for sale'}
        </span>
        
        <div className={styles.apartmentGrid}>
          <div className={styles.apartmentDetail}>
            <span className={styles.detailLabel}>Address:</span>
            <span className={styles.detailValue}>{apt.address}</span>
          </div>
          
          <div className={styles.apartmentDetail}>
            <span className={styles.detailLabel}>Size:</span>
            <span className={styles.detailValue}>{apt.area} m²</span>
          </div>
          
          <div className={styles.apartmentDetail}>
            <span className={styles.detailLabel}>Rooms:</span>
            <span className={styles.detailValue}>{apt.num_of_rooms}</span>
          </div>
          
          <div className={styles.apartmentDetail}>
            <span className={styles.detailLabel}>Floor:</span>
            <span className={styles.detailValue}>{apt.floor_number}</span>
          </div>
        </div>
        
        <div className={styles.apartmentDescription}>
          <span className={styles.detailLabel}>Description:</span> {apt.details}
        </div>
        
        <div className={styles.contactInfo}>
          <strong>Contact Owner:</strong> {apt.owner_phone}
        </div>
        
        {apt.image_url && (
          <img
            src={`http://localhost:5000${apt.image_url}`}
            alt={apt.title}
            className={styles.apartmentImage}
          />
        )}
      </div>
    </div>
  )
}

export default ApartmentDetails