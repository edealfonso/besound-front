import { useRouter } from 'next/router';
import styles from './Footer.module.scss';

export default function Footer({ activeRec = false }) {
    const router = useRouter();

    function handleClick() {
        if (router.pathname == '/') {
            router.push('/record');
        } else if (router.pathname == '/record') {
            router.push('/record/start');
        }
    }

    return (
        <footer className={styles.footer}>
            <a
                className={`${styles.rec} ${activeRec ? styles.active : ''}`}
                onClick={handleClick}
            ></a>
        </footer>
    );
}
