import React from 'react';

const Contact = () => {
    const email = 'thedoorwayservice@gmail.com';
    const subject = 'Support Request';
    const body = 'Hello, I would like to get help with...';

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return (
        <div id="contact" style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '1rem' }}>Contact Us</h2>
            <p><strong>Phone:</strong> 03-1234567</p>
            <p>
                <strong>Customer Service Email:</strong>{' '}
                <a href={gmailLink} target="_blank" rel="noopener noreferrer">
                    {email}
                </a>
            </p>
            <p><strong>Working Hours:</strong> Sunday–Thursday, 9:00 AM – 5:00 PM</p>
            <p><strong>Office Address:</strong> 12 Example Street, Tel Aviv</p>
        </div>
    );
};

export default Contact;
