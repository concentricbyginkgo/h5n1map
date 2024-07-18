import styles from './tooltip.module.css';
export default function Tooltip(props) {
    return (
        <div className={styles.tooltip} style={{ left: props.x + 'px', top: props.y + 'px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 279.55 140.77">
                <path
                    d="M268.31,140.52H25.45a10.68,10.68,0,0,1-10.59-10.77v-51a5.06,5.06,0,0,0-2.4-4.32L1.65,67.81a3,3,0,0,1,0-5l10.92-6.95a5.06,5.06,0,0,0,2.33-4.27V11A10.68,10.68,0,0,1,25.45.25H268.31A10.68,10.68,0,0,1,278.9,11V129.75A10.68,10.68,0,0,1,268.31,140.52Z"
                    fill="#fff" stroke="#0c0a10" strokeWidth="0.5" />

                {
                    props.name.split('\n').map((line, i) => {
                        return (
                            <text x="50%" y={i * 20 + 20} textAnchor="middle" fill="#0c0a10" dy=".3em">{line}</text>
                        );
                    })
                }

            </svg>
        </div>
    );
}