import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>🏠 About DOORWAY</h1>
        <div className={styles.titleUnderline}></div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.introSection}>
          <p className={styles.paragraph}>
            Welcome to <strong>DOORWAY</strong> – your gateway to real estate opportunities.
          </p>
          <p className={styles.paragraph}>
            Whether you're looking to <strong>buy</strong> or <strong>rent</strong> a property, or you want to <strong>list your own</strong>,
            DOORWAY gives you the tools to make it happen – quickly and easily.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>What You Can Do</h3>
            <ul className={styles.list}>
              <li>Post listings for apartments and homes for <strong>sale or rent</strong></li>
              <li>Include photos, location details, and full property information</li>
              <li>Reach a focused audience of serious buyers and renters</li>
            </ul>
          </div>

          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon}>🎯</div>
            <p className={styles.highlight}>
              <strong>Important:</strong> Viewing listings is available <strong>only for registered users with an active paid account</strong> –
              ensuring real interest, quality leads, and a secure environment.
            </p>
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>Why DOORWAY?</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>🔒</div>
              <div>
                <h4 className={styles.benefitTitle}>Trust & Security</h4>
                <p className={styles.benefitDesc}>A safe, spam-free platform</p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>🧭</div>
              <div>
                <h4 className={styles.benefitTitle}>Ease of Use</h4>
                <p className={styles.benefitDesc}>List a property in minutes</p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>📱</div>
              <div>
                <h4 className={styles.benefitTitle}>Mobile Ready</h4>
                <p className={styles.benefitDesc}>Access from any device</p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>💬</div>
              <div>
                <h4 className={styles.benefitTitle}>Support</h4>
                <p className={styles.benefitDesc}>We're here when you need us</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>Who We Are</h2>
          <div className={styles.storyCard}>
            <p className={styles.paragraph}>
              DOORWAY was built to make real estate searching in Israel simpler, faster, and more focused.
              We believe in giving everyone a fair chance to list their property, and in providing serious users
              with high-quality listings only – with no distractions.
            </p>
          </div>
        </section>

        <div className={styles.sloganSection}>
          <h3 className={styles.slogan}>✨ DOORWAY – Opening the door to your next home. ✨</h3>
        </div>
      </div>
    </div>
  );
};

export default About;