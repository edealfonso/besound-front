import { useContext } from 'react';
import Image from 'next/image';

import { AppContext } from '@/lib/contexts/AppContext';

import styles from './AboutButton.module.scss';
import { useMediaQuery } from '@mui/material';

export default function AboutButton({ floating }) {
    const { setIsAboutOpen } = useContext(AppContext);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    let icon_tag = floating ? '' : '-light';
    icon_tag += prefersDarkMode ? '-inv' : '';

    const aboutToggle = () => {
        setIsAboutOpen((current) => !current);
    };

    return (
        <>
            <div
                className={`${styles.aboutButton} ${
                    floating ? styles.floating : ''
                } ${prefersDarkMode ? styles.dark : ''}`}
                onClick={aboutToggle}
            >
                <Image
                    src={`icon-help${icon_tag}.svg`}
                    width={24}
                    height={24}
                    alt="Search"
                />
            </div>
        </>
    );
}
