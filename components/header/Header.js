import Link from 'next/link';

import AboutButton from './AboutButton';
import About from './About';

import styles from './Header.module.scss';

export default function Header({ recordPage, userPages }) {
    return (
        <>
            <header className={recordPage ? styles.headerLong : ''}>
                {
                    <Link
                        href="/"
                        className={styles.logo}
                        aria-label="Besound homepage"
                    ></Link>
                }
                {/* <DebugBar /> */}
                {(recordPage || userPages) && <AboutButton floating dark />}
            </header>
            <About />
        </>
    );
}
