import { useState, useRef } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import AudioPlayer from './AudioPlayer';

import styles from './Box.module.scss';

export default function Box({ share_post = false, children }) {
    const copyToClipboard = (e) => {
        // url to post
        const post_url = window.location.host + '#' + share_post.id;

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
            {share_post && (
                <>
                    <AudioPlayer
                        post={share_post}
                        selected={true}
                    ></AudioPlayer>

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
                </>
            )}
            {share_post && (
                <div
                    className={`${styles.sharePopup} ${
                        popupShow ? styles.show : ''
                    }`}
                >
                    <span>Your post URL has been copied to clipboard.</span>
                </div>
            )}
        </div>
    );
}
