import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApartmentDetails from '../apartments/apartmentDetails';
import styles from './AdminHome.module.css';

const AdminHome = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const LIMIT = 10;

    useEffect(() => {
        fetchUnapprovedApartments();
    }, []);

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

    const handleApproveClick = (apt) => {
        setSelectedApartment(apt);
        setShowApproveModal(true);
    };

    const handleRejectClick = (apt) => {
        setSelectedApartment(apt);
        setShowRejectModal(true);
    };

    const confirmApprove = async () => {
        if (!selectedApartment) return;

        try {
            const response = await axios.put(`http://localhost:5000/apartments/${selectedApartment.id}/approve`, {
                price: selectedApartment.price,
                title: selectedApartment.title,
                details: selectedApartment.details,
                is_approved: 1
            });
            if (response.status === 200) {
                setApartments((prev) => prev.filter((a) => a.id !== selectedApartment.id));
                setShowApproveModal(false);
                setSelectedApartment(null);
            }
        } catch (error) {
            setError('Error approving apartment: ' + error.message);
        }
    };

    const confirmReject = async () => {
        if (!selectedApartment) return;

        try {
            await axios.delete(
                `http://localhost:5000/apartments/${selectedApartment.id}/reject`,
                { withCredentials: true }
            );
            setApartments((prev) => prev.filter((a) => a.id !== selectedApartment.id));
            setShowRejectModal(false);
            setSelectedApartment(null);
        } catch (err) {
            setError('Error rejecting apartment: ' + err.message);
        }
    };

    const cancelAction = () => {
        setShowApproveModal(false);
        setShowRejectModal(false);
        setSelectedApartment(null);
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

    const filteredApartments = apartments.filter(apt =>
        apt.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.price?.toString().includes(searchTerm)
    );

    const sortedApartments = [...filteredApartments].sort((a, b) => {
        switch (sortBy) {
            case 'price-high':
                return (b.price || 0) - (a.price || 0);
            case 'price-low':
                return (a.price || 0) - (b.price || 0);
            case 'title':
                return (a.title || '').localeCompare(b.title || '');
            default:
                return 0;
        }
    });

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.errorState}>
                    <div className={styles.errorIcon}>⚠️</div>
                    <h3>Error</h3>
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className={styles.retryButton}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Apartment Approval Center</h2>
                <div className={styles.titleUnderline}></div>
                <p className={styles.subtitle}>Review and manage pending apartment listings</p>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchIcon}>🔍</div>
                    <input
                        type="text"
                        placeholder="Search apartments by title, details, or price..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.sortContainer}>
                    <label className={styles.sortLabel}>Sort by:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={styles.sortSelect}
                    >
                        <option value="price-high">Price: High to Low</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="title">Title A-Z</option>
                    </select>
                </div>

                <div className={styles.statsContainer}>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>{apartments.length}</span>
                        <span className={styles.statLabel}>Pending Approval</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>{filteredApartments.length}</span>
                        <span className={styles.statLabel}>Filtered Results</span>
                    </div>
                </div>
            </div>

            {loading && apartments.length === 0 ? (
                <div className={styles.loadingSpinner}>
                    <div className={styles.spinner}></div>
                    <p>Loading apartments...</p>
                </div>
            ) : sortedApartments.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>🏠</div>
                    <h3>No apartments pending approval</h3>
                    <p>{searchTerm ? 'Try adjusting your search criteria' : 'All apartments have been reviewed!'}</p>
                </div>
            ) : (
                <div className={styles.apartmentsGrid}>
                    {sortedApartments.map((apt) => (
                        <div key={apt.id} className={styles.apartmentCard}>
                            <div className={styles.apartmentHeader}>
                                <div className={styles.apartmentBadge}>
                                    <span className={styles.badgeIcon}>⏳</span>
                                    Pending Review
                                </div>
                                <div className={styles.apartmentId}>ID: {apt.id}</div>
                            </div>

                            <div className={styles.apartmentContent}>
                                <ApartmentDetails apt={apt} />
                            </div>

                            <div className={styles.apartmentActions}>
                                <button
                                    onClick={() => handleApproveClick(apt)}
                                    className={styles.approveButton}
                                    title="Approve apartment"
                                >
                                    ✅ Approve
                                </button>
                                <button
                                    onClick={() => handleRejectClick(apt)}
                                    className={styles.rejectButton}
                                    title="Reject apartment"
                                >
                                    ❌ Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {loading && apartments.length > 0 && (
                <div className={styles.loadMore}>
                    <div className={styles.spinner}></div>
                    <p>Loading more apartments...</p>
                </div>
            )}

            {!hasMore && apartments.length > 0 && (
                <div className={styles.endMessage}>
                    <p>You've reached the end of the list</p>
                </div>
            )}

            {showApproveModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3>Approve Apartment</h3>
                        </div>
                        <div className={styles.modalBody}>
                            <p>Are you sure you want to approve this apartment listing?</p>
                            <div className={styles.apartmentPreview}>
                                <strong>{selectedApartment?.title}</strong>
                                <br />
                                <span className={styles.previewPrice}>
                                    ${selectedApartment?.price?.toLocaleString()}
                                </span>
                                <br />
                                <span className={styles.previewId}>ID: {selectedApartment?.id}</span>
                            </div>
                            <p className={styles.confirmText}>This will make the apartment visible to all users.</p>
                        </div>
                        <div className={styles.modalActions}>
                            <button
                                onClick={cancelAction}
                                className={styles.cancelButton}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmApprove}
                                className={styles.confirmApproveButton}
                            >
                                Approve Apartment
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showRejectModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3>Reject Apartment</h3>
                        </div>
                        <div className={styles.modalBody}>
                            <p>Are you sure you want to reject this apartment listing?</p>
                            <div className={styles.apartmentPreview}>
                                <strong>{selectedApartment?.title}</strong>
                                <br />
                                <span className={styles.previewPrice}>
                                    ${selectedApartment?.price?.toLocaleString()}
                                </span>
                                <br />
                                <span className={styles.previewId}>ID: {selectedApartment?.id}</span>
                            </div>
                            <p className={styles.warningText}>This action will permanently delete the apartment listing.</p>
                        </div>
                        <div className={styles.modalActions}>
                            <button
                                onClick={cancelAction}
                                className={styles.cancelButton}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmReject}
                                className={styles.confirmRejectButton}
                            >
                                Reject & Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminHome;