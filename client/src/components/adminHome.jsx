import React, { useEffect, useState } from 'react';
import axios from 'axios';

const adminHome = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUnapprovedApartments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/apartments?is_approved=${false}`);
            setApartments(response.data);
        } catch (error) {
            setError('Error fetching unapproved apartments:', error);
        } finally {
            setLoading(false);
        }
    };

    const approveApartment = async (id) => {
        try {
            await axios.put(`http://localhost:5000/apartments/${id}`, { is_approved: 1 });
            setApartments((prev) => prev.filter((apt) => apt.id !== id));
        } catch (error) {
            setError('Error approving apartment:', error);
        }
    };

    useEffect(() => {
        fetchUnapprovedApartments();
    }, []);

    if (loading) return <div>loading apartments...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Not Approved Apartments</h2>
            {apartments.length === 0 ? (
                <p>currently no apartments to approve!</p>
            ) : (
                apartments.map((apt) => (
                    <div key={apt.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                        <p><strong>כתובת:</strong> {apt.address}</p>
                        <p><strong>מחיר:</strong> {apt.price} ₪</p>
                        <p><strong>כותרת:</strong> {apt.title}</p>
                        <button onClick={() => approveApartment(apt.id)}>approve</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default adminHome;
