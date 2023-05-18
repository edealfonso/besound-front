import { useEffect, useState } from 'react';
import useSound from 'use-sound';

import styles from './AudioPlayer.module.scss';

export default function AudioPlayer({ post, selected, index, emitClick }) {
    const [played, setPlayed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const soundUrl = post.audio;

    // turn off when another sound is selected
    useEffect(() => {
        if (!selected) {
            stopPlayer();
        }
    }, [selected]);

    const [play, { sound, stop, duration }] = useSound(soundUrl, {
        // playbackRate: 0.3,
        volume: 0.25,
        interrupt: true
    });

    // click action depends on if sound is currently playing
    function handleClick() {
        emitClick(index);

        if (!isPlaying) {
            startPlayer();
        } else {
            stopPlayer();
        }
    }

    function startPlayer() {
        setIsPlaying(true);
        setPlayed(true);
        play();
    }

    function stopPlayer() {
        setIsPlaying(false);
        stop();
    }

    return (
        <a
            onClick={handleClick}
            className={`${styles.audioPlayer} ${played ? styles.played : ''} ${
                selected ? styles.active : ''
            }`}
            id={post.id}
        >
            <span className={styles.title} data-title={`#${post.title}`}>
                #{post.title}
            </span>
        </a>
    );
}
