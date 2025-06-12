import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApartmentDetails from './apartmentDetails';
export default function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [cities, setCities] = useState([]);
  const [types, setTypes] = useState(['rent', 'sale']);
  useEffect(() => {
    const fetchFilters = async () => {

      setCities([...new Set(apartments.map((apt) => apt.city))]);
    };

    fetchFilters();
  }, [apartments]);

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

  const filteredApartments = apartments.filter((apt) => {
    return (
      (cityFilter === '' || apt.city === cityFilter) &&
      (typeFilter === '' || apt.type === typeFilter)
    );
  });

  if (loading) return <div>Loading apartments...</div>;
  if (error) return <div>{error}</div>;

  if (apartments.length === 0) {
    return <div>No apartments found.</div>;
  }

  return (
    <div>
      {/* ⭐️ **הוספה: ממשק סינון לפי עיר וסוג** */}
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Filter by city:
          <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
            <option value="">All</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: '1rem' }}>
          Filter by type:
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All</option>
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>

      {/* ⭐️ **החלפה: שימוש בדירות המסוננות** */}
      {filteredApartments.length === 0 ? (
        <div>No apartments found.</div>
      ) : (
        filteredApartments.map((apt) => (
          <div key={apt.id}>
            <ApartmentDetails apt={apt} />
          </div>
        ))
      )}
    </div>
  );
}
