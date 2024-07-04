import Image from 'next/image';
import mapSvg from '../../public/map.svg';
import styles from './map.module.css';

export default function Map() {
    return (
        <div className={styles.mapContainer}>
            <Image src={mapSvg} alt="H5N1 Map" className={styles.mapImage} priority={true} fill={true} />
        </div>
    );
}