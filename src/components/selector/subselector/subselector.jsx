import styles from './subselector.module.css';

export default function Subselector(props) {
    // console.log('Subselector:');
    // console.log(props);
    
    return (
        <div className={styles.subselector + ' borderBox'}>
            <ul>
                {props.options.map((option, index) => {
                    return (
                        <li key={index}
                            onClick={() => props.setSelected(option)}
                            className={option === props.selected ? styles.active : ''}>
                            {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}