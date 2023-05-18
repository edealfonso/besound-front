import { useEffect, useState } from 'react';
import Image from 'next/image';

import Info from '../common/Info';
import styles from './Splash.module.scss';

export default function Splash({ motto }) {
    const [show, setShow] = useState(true);
    const [showing, setShowing] = useState(false);

    useEffect(() => {
        let show_timer;

        if (!sessionStorage.getItem('isSplashShown')) {
            setShowing(true);
            setShow(true);
            show_timer = setTimeout(() => {
                sessionStorage.setItem('isSplashShown', 'true');
                setShow(false);
            }, 1500);
        } else {
            setShow(false);
        }
        return () => {
            if (show_timer) clearTimeout(show_timer);
        };
    }, []);

    return (
        <div
            className={`${styles.splash} ${show ? '' : styles.hide}  ${
                showing ? styles.transition : ''
            }`}
        >
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
