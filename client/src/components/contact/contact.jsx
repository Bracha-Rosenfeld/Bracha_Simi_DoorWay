// import React, { useState } from 'react';
// import TawkTo from './tawkTo';

// const Contact = ({ userRole }) => {
//     const initialInfo = {
//         phone: '03-1234567',
//         email: 'thedoorwayservice@gmail.com',
//         subject: 'Support Request',
//         body: 'Hello, I would like to get help with...',
//         hours: 'Sunday–Thursday, 9:00 AM – 5:00 PM',
//         address: 'Zolti 14 Street, Ramat Shlomo, Jerusalem, Israel'
//     };

//     const [contactInfo, setContactInfo] = useState(initialInfo);
//     const [originalInfo, setOriginalInfo] = useState(initialInfo);
//     const [isEditing, setIsEditing] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setContactInfo((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSave = () => {
//         setOriginalInfo(contactInfo);
//         setIsEditing(false);
//     };

//     const handleCancel = () => {
//         setContactInfo(originalInfo);
//         setIsEditing(false);
//     };

//     const hasChanges = JSON.stringify(contactInfo) !== JSON.stringify(originalInfo);

//     const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email}&su=${encodeURIComponent(contactInfo.subject)}&body=${encodeURIComponent(contactInfo.body)}`;

//     return (
//         <div id="contact">
//             <h2 style={{ marginBottom: '1rem' }}>Contact Us</h2>

//             {isEditing ? (
//                 <div>
//                     <div>
//                         <label>Phone:</label>
//                         <input name="phone" value={contactInfo.phone} onChange={handleChange} />
//                     </div>
//                     <div>
//                         <label>Email:</label>
//                         <input name="email" value={contactInfo.email} onChange={handleChange} />
//                     </div>
//                     <div>
//                         <label>Email Subject:</label>
//                         <input name="subject" value={contactInfo.subject} onChange={handleChange} />
//                     </div>
//                     <div>
//                         <label>Email Body:</label>
//                         <textarea name="body" value={contactInfo.body} onChange={handleChange} />
//                     </div>
//                     <div>
//                         <label>Working Hours:</label>
//                         <input name="hours" value={contactInfo.hours} onChange={handleChange} />
//                     </div>
//                     <div>
//                         <label>Address:</label>
//                         <input name="address" value={contactInfo.address} onChange={handleChange} />
//                     </div>
//                     <div style={{ marginTop: '1rem' }}>
//                         {hasChanges && <button onClick={handleSave}>Save</button>}
//                         <button onClick={handleCancel} style={{ marginLeft: '0.5rem' }}>Cancel</button>
//                     </div>
//                 </div>
//             ) : (
//                 <div>
//                     <p><strong>Phone:</strong> {contactInfo.phone}</p>
//                     <p>
//                         <strong>Customer Service Email:</strong>{' '}
//                         <a href={gmailLink} target="_blank" rel="noopener noreferrer">
//                             {contactInfo.email}
//                         </a>
//                     </p>
//                     <p><strong>Working Hours:</strong> {contactInfo.hours}</p>
//                     <p><strong>Office Address:</strong> {contactInfo.address}</p>
//                 </div>
//             )}

//             {userRole === 'admin' && !isEditing && (
//                 <button onClick={() => setIsEditing(true)}>Edit Contact Info</button>
//             )}

//             <TawkTo />
//         </div>
//     );
// };

// export default Contact;


import React, { useState } from 'react';
import TawkTo from '../tawkTo';
import styles from './Contact.module.css';

const Contact = ({ userRole }) => {
    const initialInfo = {
        phone: '03-1234567',
        email: 'thedoorwayservice@gmail.com',
        subject: 'Support Request',
        body: 'Hello, I would like to get help with...',
        hours: 'Sunday–Thursday, 9:00 AM – 5:00 PM',
        address: 'Zolti 14 Street, Ramat Shlomo, Jerusalem, Israel'
    };

    const [contactInfo, setContactInfo] = useState(initialInfo);
    const [originalInfo, setOriginalInfo] = useState(initialInfo);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setOriginalInfo(contactInfo);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setContactInfo(originalInfo);
        setIsEditing(false);
    };

    const hasChanges = JSON.stringify(contactInfo) !== JSON.stringify(originalInfo);

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email}&su=${encodeURIComponent(contactInfo.subject)}&body=${encodeURIComponent(contactInfo.body)}`;

    return (
        <section id="contact" className={styles.contactSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Contact Us</h2>
                    <div className={styles.titleUnderline}></div>
                </div>

                {isEditing ? (
                    <div className={styles.editForm}>
                        <div className={styles.formGrid}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Phone</label>
                                <input 
                                    className={styles.input}
                                    name="phone" 
                                    value={contactInfo.phone} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email</label>
                                <input 
                                    className={styles.input}
                                    name="email" 
                                    value={contactInfo.email} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email Subject</label>
                                <input 
                                    className={styles.input}
                                    name="subject" 
                                    value={contactInfo.subject} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Working Hours</label>
                                <input 
                                    className={styles.input}
                                    name="hours" 
                                    value={contactInfo.hours} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Email Body</label>
                                <textarea 
                                    className={`${styles.input} ${styles.textarea}`}
                                    name="body" 
                                    value={contactInfo.body} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                <label className={styles.label}>Address</label>
                                <input 
                                    className={styles.input}
                                    name="address" 
                                    value={contactInfo.address} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                        <div className={styles.buttonGroup}>
                            {hasChanges && (
                                <button 
                                    className={`${styles.button} ${styles.saveButton}`}
                                    onClick={handleSave}
                                >
                                    Save Changes
                                </button>
                            )}
                            <button 
                                className={`${styles.button} ${styles.cancelButton}`}
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.contactInfo}>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoCard}>
                                <div className={styles.infoIcon}>📞</div>
                                <div className={styles.infoContent}>
                                    <h3 className={styles.infoTitle}>Phone</h3>
                                    <p className={styles.infoText}>{contactInfo.phone}</p>
                                </div>
                            </div>
                            
                            <div className={styles.infoCard}>
                                <div className={styles.infoIcon}>✉️</div>
                                <div className={styles.infoContent}>
                                    <h3 className={styles.infoTitle}>Email</h3>
                                    <a 
                                        href={gmailLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={styles.emailLink}
                                    >
                                        {contactInfo.email}
                                    </a>
                                </div>
                            </div>
                            
                            <div className={styles.infoCard}>
                                <div className={styles.infoIcon}>🕒</div>
                                <div className={styles.infoContent}>
                                    <h3 className={styles.infoTitle}>Working Hours</h3>
                                    <p className={styles.infoText}>{contactInfo.hours}</p>
                                </div>
                            </div>
                            
                            <div className={`${styles.infoCard} ${styles.addressCard}`}>
                                <div className={styles.infoIcon}>📍</div>
                                <div className={styles.infoContent}>
                                    <h3 className={styles.infoTitle}>Office Address</h3>
                                    <p className={styles.infoText}>{contactInfo.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {userRole === 'admin' && !isEditing && (
                    <div className={styles.adminSection}>
                        <button 
                            className={`${styles.button} ${styles.editButton}`}
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Contact Info
                        </button>
                    </div>
                )}

                <div className={styles.tawkToWrapper}>
                    <TawkTo />
                </div>
            </div>
        </section>
    );
};

export default Contact;