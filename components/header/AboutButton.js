import Link from 'next/link';
import Image from 'next/image';

import styles from './AboutButton.module.scss';

export default function AboutButton({ dark, floating }) {
    return (
        <Link
            href="/about"
            className={`${styles.aboutButton} ${
                floating ? styles.floating : ''
            }`}
        >
            <Image
                src={`icon-help${dark ? '' : '-light'}.svg`}
                width={24}
                height={24}
                alt="Search"
                className={styles.help}
            />
        </Link>
    );
}
