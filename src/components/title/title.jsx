import styles from './title.module.css';

export default function Title() {
    return (
        <div className={styles.title + ' borderBox dynaPad fontL'}>
            <h1>Bird Flu (H5N1)</h1>
            <h1>U.S. Tracker</h1>
        </div>
    );
}