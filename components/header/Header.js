import Link from 'next/link';
import AboutButton from './AboutButton';
import DebugBar from '../common/DebugBar';

import styles from './Header.module.scss';
import About from './About';

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
