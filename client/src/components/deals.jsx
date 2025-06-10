import React from 'react'
import ViewApartments from './viewApartments';

const deals = () => {
  return (
    <>
      <ViewApartments></ViewApartments>
      {/* <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '250px' }}>
              <h3>Monthly Plan</h3>
              <p>Get full access to all apartment listings for one month.</p>
              <p><strong>Price:</strong> $80</p>
              <button onClick={() => choosePlan(80)}>Choose Monthly</button>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '250px' }}>
              <h3>Bi-Monthly Plan</h3>
              <p>Access all apartments for two months at a discounted rate.</p>
              <p><strong>Price:</strong> $150</p>
              <button onClick={() => choosePlan(150)}>Choose Bi-Monthly</button>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '250px' }}>
              <h3>Publish</h3>
              <p>Publish your apartment for sale or rent</p>
              <p><strong>Price:</strong> No fee </p>
              <button onClick={() => choosePlan(150)}>Choose Bi-Monthly</button>
            </div>
          </div> */}
    </>
  )
}

export default deals;