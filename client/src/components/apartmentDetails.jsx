import React from 'react'

const apartmentDetails = ({apt}) => {
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
    </div>
  )
}

export default apartmentDetails