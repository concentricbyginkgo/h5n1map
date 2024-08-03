import styles from './title.module.css';

export default function Title() {
    return (
        <div className={styles.title + ' borderBox dynaPad fontL'}>
            <h1>Cross-Species</h1>
            <h1>H5N1 US Tracker</h1>
        </div>
    );
}