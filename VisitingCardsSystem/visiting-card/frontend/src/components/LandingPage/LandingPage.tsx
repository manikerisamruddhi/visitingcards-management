import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';  // Import CSS module

const LandingPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Visiting Cards System Management</h1>
        <p className={styles.subtitle}>
          Manage and organize your visiting cards easily with our intuitive system. Get started now!
        </p>
        <Link to="/login">
          <button className={styles.button}>Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
