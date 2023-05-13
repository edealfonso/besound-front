import { useEffect, useState } from 'react';
import useSound from 'use-sound';

import styles from './AudioPlayer.module.scss';

export default function AudioPlayer({ post }) {
    const [played, setPlayed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const soundUrl = post.audio;

    // const [play, { stop, isPlaying }] = useSound(soundUrl, {
    //     // playbackRate: 0.3,
    //     volume: 0.25,
    //     interrupt: true
    // });

    const [play, { sound, stop, duration }] = useSound(soundUrl, {
        // playbackRate: 0.3,
        volume: 0.25,
        interrupt: true
    });

    const handleClick = async (event) => {
        if (!isPlaying) {
            setIsPlaying(true);
            setPlayed(true);
            play();
        } else {
            setIsPlaying(false);
            stop();
        }
    };

    return (
        <a
            onClick={handleClick} // className={`${styles.audioPlayer} ${played ? styles.played : ''}}`}
            className={`${styles.audioPlayer} ${played ? styles.played : ''} ${
                isPlaying ? styles.active : ''
            }`}
            id={post.id}
        >
            <span className={styles.title} data-title={`#${post.title}`}>
                #{post.title}
            </span>
        </a>
    );
}
