import styles from './Info.module.scss';

export default function Info({
    highlight = false,
    splash = false,
    warning = false,
    large = false,
    box = false,
    children
}) {
    const classes = `${styles.info} ${highlight ? styles.highlight : ''} ${
        splash ? styles.splash : ''
    } ${warning ? styles.warning : ''} ${large ? styles.large : ''} ${
        box ? styles.box : ''
    }`;

    return <div className={classes}>{children}</div>;
}
