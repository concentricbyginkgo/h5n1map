import Image from 'next/image';
import mapSvg from '../../public/map.svg';
import styles from './map.css';

export default function Map() {
    return (
        <div className='map'>
            <Image src={mapSvg} alt="H5N1 Map" className='mapImage' priority={true} />
        </div>
    );
}