import styles from './selector.module.css';

import Subselector from './subselector/subselector.jsx';

export default function Selector() {
    return (
        <div className={styles.selector}>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
                <li>Item 4</li>
                <li>Item 5</li>
                <li>Item 6
                    <Subselector />
                </li>
            </ul>
        </div>
    );
}