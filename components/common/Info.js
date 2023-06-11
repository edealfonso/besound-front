import styles from './Info.module.scss';

export default function Info({
    highlight,
    splash,
    warning,
    large,
    box,
    flex,
    top,
    desktop_box,
    children
}) {
    const classes = `${styles.info} ${highlight ? styles.highlight : ''} ${
        splash ? styles.splash : ''
    } ${warning ? styles.warning : ''} ${large ? styles.large : ''} ${
        box ? styles.box : ''
    } ${desktop_box ? styles.desktop_box : ''} ${flex ? styles.flex : ''} ${
        top ? styles.top : ''
    }`;

    return <div className={classes}>{children}</div>;
}
