import styles from './dot.module.css';

export default function Dot(props) {
    return (
        <div
            className={styles.dot}
            style={{
                backgroundColor: props.color,
            }}
        />
    );
}