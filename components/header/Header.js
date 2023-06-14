import Link from 'next/link';
import AboutButton from './AboutButton';
import DebugBar from '../common/DebugBar';

import styles from './Header.module.scss';

export default function Header({ recordPage, aboutPage, userPages }) {
    if (aboutPage) {
        return (
            <div className={styles.invert}>
                <Link href="/" className={styles.logo}></Link>
            </div>
        );
    }

    return (
        <>
            <header
                className={`${recordPage ? styles.long : ''} ${
                    aboutPage ? styles.invert : ''
                }`}
            >
                {!aboutPage && <Link href="/" className={styles.logo}></Link>}
                {aboutPage && <div className={styles.logo}></div>}
                <DebugBar />
                {(recordPage || userPages) && <AboutButton floating dark />}
            </header>
        </>
    );
}
