import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApartmentDetails from './apartmentDetails';
import { useCurrentUser } from './userProvider';
const adminHome = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const LIMIT = 10;

    useEffect(() => {
        fetchUnapprovedApartments();
    }, [])

    const fetchUnapprovedApartments = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/apartments?is_approved=false&limit=${LIMIT}&offset=${offset}`, {
                withCredentials: true
            });

            const data = response.data;
            if (data.length < LIMIT) setHasMore(false);

            setApartments(prev => [...prev, ...data]);
            setOffset(prev => prev + LIMIT);
        } catch (error) {
            console.error("Error fetching unapproved apartments:", error);
            setError('Error fetching unapproved apartments');
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
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 100 >=
                document.documentElement.offsetHeight
            ) {
                fetchUnapprovedApartments();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [offset, loading, hasMore]);

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Not Approved Apartments</h2>
            {loading && <p>Loading more apartments...</p>}
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
