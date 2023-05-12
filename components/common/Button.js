import styles from './Button.module.scss';

export default function Button({
    url,
    alt = false,
    target_blank = false,
    children
}) {
    const classes = `${styles.button} ${alt ? styles.alt : ''}`;

    return (
        <>
            {target_blank && (
                <a className={classes} href={url} target="_blank">
                    {children}
                </a>
            )}
            {!target_blank && (
                <a className={classes} href={url}>
                    {children}
                </a>
            )}
        </>
    );
}
