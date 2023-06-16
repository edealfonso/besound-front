import Image from 'next/image';

import styles from './AboutButton.module.scss';

import { useContext } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';
import About from './About';

export default function AboutButton({ dark, floating }) {
    const { setIsAboutOpen } = useContext(AppContext);

    const aboutToggle = () => {
        setIsAboutOpen((current) => !current);
    };

    return (
        <>
            <div
                className={`${styles.aboutButton} ${
                    floating ? styles.floating : ''
                }`}
                onClick={aboutToggle}
            >
                <Image
                    src={`icon-help${dark ? '' : '-light'}.svg`}
                    width={24}
                    height={24}
                    alt="Search"
                    className={styles.help}
                />
            </div>
        </>
    );
}
