import styles from './Info.module.scss';

export default function Info({ highlight = false, alt = false, children }) {
    const classes = `${styles.info} ${highlight ? styles.highlight : ''} ${
        alt ? styles.alt : ''
    }`;

    return <div className={classes}>{children}</div>;
}
