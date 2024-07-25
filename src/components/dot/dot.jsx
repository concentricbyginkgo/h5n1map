import styles from './dot.module.css';

export default function Dot(props) {
    // console.log('Dot:');
    // console.log(props);

    return (
        <div className={styles.dotContainer}>
            <div
                className={ props.outline ? styles.dot + ' ' + styles.outline : styles.dot}
                style={{
                    backgroundColor: props.color,
                }}
            />
            <span>{props.label}</span>
        </div>
    );
}