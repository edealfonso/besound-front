import { useEffect, useState } from 'react';
import Image from 'next/image';

import Info from '../common/Info';
import styles from './Splash.module.scss';

export default function Splash({ motto }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const isSplashShown = sessionStorage.getItem('isSplashShown');
        if (!isSplashShown) {
            setShow(true);
            sessionStorage.setItem('isSplashShown', 'true');
            let show_timer = setTimeout(() => {
                setShow(false);
            }, 1500);
            return () => {
                clearTimeout(show_timer);
            };
        }
    }, []);

    return (
        <div className={`${styles.splash} ${show ? '' : styles.hide}`}>
            <Image
                src="logo-light.svg"
                alt="besound"
                width={147}
                height={30}
                priority
                className={styles.logo}
            />
            <Info splash>{motto}</Info>
        </div>
    );
}
