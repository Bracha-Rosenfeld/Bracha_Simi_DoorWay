import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🏠 About DOORWAY</h1>
      <p className={styles.paragraph}>
        Welcome to <strong>DOORWAY</strong> – your gateway to real estate opportunities.
      </p>
      <p className={styles.paragraph}>
        Whether you're looking to <strong>buy</strong> or <strong>rent</strong> a property, or you want to <strong>list your own</strong>,
        DOORWAY gives you the tools to make it happen – quickly and easily.
      </p>
      <ul className={styles.list}>
        <li>Post listings for apartments and homes for <strong>sale or rent</strong></li>
        <li>Include photos, location details, and full property information</li>
        <li>Reach a focused audience of serious buyers and renters</li>
      </ul>
      <p className={styles.highlight}>
        🎯 <strong>Important:</strong> Viewing listings is available <strong>only for registered users with an active paid account</strong> –
        ensuring real interest, quality leads, and a secure environment.
      </p>

      <h2 className={styles.subtitle}>Why DOORWAY?</h2>
      <ul className={styles.list}>
        <li>🔒 <strong>Trust & Security</strong> – A safe, spam-free platform</li>
        <li>🧭 <strong>Ease of Use</strong> – List a property in minutes</li>
        <li>📱 <strong>Mobile Ready</strong> – Access from any device</li>
        <li>💬 <strong>Support</strong> – We're here when you need us</li>
      </ul>

      <h2 className={styles.subtitle}>Who We Are</h2>
      <p className={styles.paragraph}>
        DOORWAY was built to make real estate searching in Israel simpler, faster, and more focused.
        We believe in giving everyone a fair chance to list their property, and in providing serious users
        with high-quality listings only – with no distractions.
      </p>

      <h3 className={styles.slogan}>✨ DOORWAY – Opening the door to your next home. ✨</h3>
    </div>
  );
};

export default About;
