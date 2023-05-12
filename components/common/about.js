import styles from './About.module.scss';

export default function About({ children }) {
    return (
        <div className={styles.popup}>
            <div className={styles.mainContainer}>About Popup</div>
        </div>
    );
}
