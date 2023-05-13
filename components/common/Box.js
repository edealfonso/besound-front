import { useState, useRef } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import AudioPlayer from '../home/AudioPlayer';

import styles from './Box.module.scss';

export default function Box({ share_post = false, children }) {
    const copyToClipboard = (e) => {
        // copy to clipboard
        navigator.clipboard.writeText(window.location.toString());

        // show message popup for 1s
        setPopupShow(true);
        setTimeout(() => {
            setPopupShow(false);
        }, 1000);
    };

    const [popupShow, setPopupShow] = useState(false);

    return (
        <div className={styles.box}>
            {children}
            {share_post && (
                <>
                    <AudioPlayer post={share_post}></AudioPlayer>
                    <div className={styles.share}>
                        <Link href={share_post.audio} target="_blank">
                            <Image
                                src="icon-download.svg"
                                width={31}
                                height={34}
                                alt="Download"
                            />
                        </Link>
                        <a onClick={copyToClipboard}>
                            <Image
                                src="icon-share.svg"
                                width={31}
                                height={34}
                                alt="Download"
                            />
                        </a>
                    </div>
                    <div
                        className={`${styles.sharePopup} ${
                            popupShow ? styles.show : ''
                        }`}
                    >
                        Your post URL has been copied to clipboard.
                    </div>
                </>
            )}
        </div>
    );
}
