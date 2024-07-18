import styles from './scale.module.css';

export default function ScaleKey( { color, max, stateCounty = 'county' } ) {
    return (
        <div className={styles.scaleKey}>
            <h3>Number of positive cases by { stateCounty } </h3>
            <div className={styles.gradient} style={{ background: `linear-gradient(to right, white, ${color})` }}></div> 
            <h3 className={styles.min}>1</h3><h3 className={styles.max}>{max}</h3>            
        </div>
    );
}