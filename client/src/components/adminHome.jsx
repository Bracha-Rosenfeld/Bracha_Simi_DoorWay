import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApartmentDetails from './apartmentDetails';
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

    const approveApartment = async (apt) => {
        try {
            const response = await axios.put(`http://localhost:5000/apartments/${apt.id}/approve`, { price: apt.price, title: apt.title, details: apt.details, is_approved: 1 });
            if (response.status === 200) {
                setApartments((prev) => prev.filter((a) => a.id !== apt.id));
            }
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
                    <div key={apt.id} >
                        <ApartmentDetails apt={apt} />
                        <button onClick={() => approveApartment(apt)}>approve</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default adminHome;
