import styles from './Box.module.scss';

export default function Box({ children }) {
    return <div className={styles.box}>{children}</div>;
}
