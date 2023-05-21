import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import AudioPlayer from './AudioPlayer';

import styles from './ShareBox.module.scss';

export default function ShareBox({ post, children }) {
    const copyToClipboard = (e) => {
        // url to post
        const post_url = window.location.host + '#' + post.id;

        // copy to clipboard
        navigator.clipboard.writeText(post_url);

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
            <AudioPlayer post={post} independent></AudioPlayer>
            <div className={styles.share}>
                <Link href={post.audio} download="besound.mp3" target="_blank">
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
                <span>Your post URL has been copied to the clipboard.</span>
            </div>
        </div>
    );
}
