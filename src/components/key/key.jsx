import styles from './key.module.css';

import Scale from '../scale/scale';
import Dot
 from '../dot/dot';
export default function Key(props) {
    console.log('Key:');
    console.log(props);

    return (
        <div className={styles.key}>
            <h3>Title</h3>          
            <h5>Subtitle</h5>
        </div>
    );
}