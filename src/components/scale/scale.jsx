import styles from './scale.module.css';

function mix1channel(rgb1, rgb2, ratio) {
    return rgb1 + (rgb2 - rgb1) * ratio;
}

export default function ScaleKey( { color, max, stateCounty = 'county' } ) {
    // half white half color
    const white = '#ffffff';
    const wr = Math.round(mix1channel(parseInt(white.slice(1, 3), 16), parseInt(color.slice(1, 3), 16), .5));
    const wg = Math.round(mix1channel(parseInt(white.slice(3, 5), 16), parseInt(color.slice(3, 5), 16), .5));
    const wb = Math.round(mix1channel(parseInt(white.slice(5, 7), 16), parseInt(color.slice(5, 7), 16), .5));
    const halfwhite = `#${wr.toString(16).padStart(2, '0')}${wg.toString(16).padStart(2, '0')}${wb.toString(16).padStart(2, '0')}`;
    
    return (
        <div className={styles.scaleKey}>
            <h3>Number of positive cases by { stateCounty } </h3>
            <div className={styles.gradient} style={{ background: `linear-gradient(to right, ${halfwhite}, ${color})` }}></div> 
            <h3 className={styles.min}>1</h3><h3 className={styles.max}>{max}</h3>            
        </div>
    );
}