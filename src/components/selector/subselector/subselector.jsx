import { useState } from 'react';
import styles from './subselector.module.css';

export default function Subselector(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.bb + ' borderBox smallF'}>
            <div className={'borderBox'}>
                <div onClick={toggleDropdown} className={styles.dropdownToggle}>
                    {props.selected || 'Select an option'}
                    <svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 7 24 10" width="24" height="10" style={{ transform: (isOpen ? 'rotate(180deg) translateX(-15px)' : 'rotate(0deg) translateX(15px)') + 'scale(.7, .55) ' }}>
                        <path d="M7 10l5 5" stroke="black" strokeWidth="1" />
                        <path d="M12 15l5-5" stroke="black" strokeWidth="1" />
                    </svg>
                </div>
                {isOpen && (
                    <ul className={styles.subselector + ' borderBox'}>
                        {props.options.map((option, index) => (
                            <li key={index}
                                onClick={() => {
                                    props.setSelected(option);
                                    setIsOpen(false);
                                }}
                                className={option === props.selected ? styles.active : ''}>
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}