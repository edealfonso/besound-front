import { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from './Splash.module.scss';
import Info from '../common/Info';

const SPLASH_TIME = 150;

export default function Splash({ motto }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        let show_timer = setTimeout(() => setShow(false), SPLASH_TIME);
        return () => {
            clearTimeout(show_timer);
        };
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
