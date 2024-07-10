
import React from 'react';
import styles from './loading.module.css';

const LoadingOverlay = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.spinner} />
        </div>
    );
};

export default LoadingOverlay;