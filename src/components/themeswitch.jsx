'use client';

import styles from "./topbar.css";
import styles2 from "./topbarS.css";

const FullTheme = () => {
    return (
        <style>
            {styles}
        </style>
    );
};

const SimpleTheme = () => {
    return (
        <style>
            {styles2}
        </style>
    );
};

export default function Theme({ theme }) {
    return theme === "full" ? <FullTheme /> : <SimpleTheme />;
}
