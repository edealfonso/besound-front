import { useContext } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { HomeContext } from '@/lib/contexts/HomeContext';

import stylesHeader from './Header.module.scss';
import styles from './HeaderHome.module.scss';
import AboutButton from './AboutButton';

const duration = 300;

const defaultStyle = {
    transition: `left ${duration}ms ease-in-out`,
    left: '-50rem'
};

const transitionStyles = {
    entering: { left: 0 },
    entered: { left: 0 },
    exiting: { left: '-50rem' },
    exited: { left: '-50rem' }
};

export default function HeaderHome() {
    const { isSearchOpen, setIsSearchOpen } = useContext(HomeContext);

    return (
        <>
            <header className={styles.header}>
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
            {/* <Transition nodeRef={nodeRef} in={isAboutOpen} timeout={duration}>
                {(state) => (
                    <div
                        ref={nodeRef}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                        className={styles.popup}
                    >
                        <About />
                    </div>
                )}
            </Transition> */}
        </>
    );
}
