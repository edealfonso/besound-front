import styles from './Info.module.scss';

export default function Info({
    highlight = false,
    splash = false,
    warning = false,
    children
}) {
    const classes = `${styles.info} ${highlight ? styles.highlight : ''} ${
        splash ? styles.splash : ''
    } ${warning ? styles.warning : ''}`;

    return <div className={classes}>{children}</div>;
}
