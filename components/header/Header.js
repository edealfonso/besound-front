import Link from 'next/link';

import AboutButton from './AboutButton';
import About from './About';
import DebugBar from '../common/DebugBar';

import styles from './Header.module.scss';

export default function Header({ recordPage, userPages }) {
    return (
        <>
            <header className={recordPage ? styles.headerLong : ''}>
                {<Link href="/" className={styles.logo}></Link>}
                <DebugBar />
                {(recordPage || userPages) && <AboutButton floating dark />}
            </header>
            <About />
        </>
    );
}
