import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { HomeContext } from '@/lib/contexts/HomeContext';

import AboutButton from './AboutButton';
import DebugBar from '../common/DebugBar';
import About from './About';

import styles from './HeaderHome.module.scss';
import stylesHeader from './Header.module.scss';

export default function HeaderHome() {
    const { isSearchOpen, setIsSearchOpen } = useContext(HomeContext);

    return (
        <>
            <header className={styles.header}>
                <DebugBar home />
                <Image
                    src="icon-search-light.svg"
                    width={24}
                    height={24}
                    alt="Search"
                    onClick={() => {
                        setIsSearchOpen(true);
                    }}
                    className={`${styles.searchIcon} ${
                        isSearchOpen ? styles.hide : ''
                    }`}
                />
                <Link href="/" className={stylesHeader.logo}></Link>
                <AboutButton />
            </header>
            <About />
        </>
    );
}
