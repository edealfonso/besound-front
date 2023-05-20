import { useEffect, useState } from 'react';
import useSound from 'use-sound';

import styles from './AudioPlayer.module.scss';

export default function AudioPlayer({ post, selected, index, emitClick }) {
    const [played, setPlayed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // define useSound
    const [play, { stop }] = useSound(post.audio, {
        interrupt: true
    });

    // turn off when another sound is selected
    useEffect(() => {
        if (!selected) {
            stopPlayer();
        } else {
            startPlayer();
        }
    }, [selected]);

    // stop audio when component is unmounted
    useEffect(() => {
        return () => {
            stop();
        };
    }, []);

    // click action depends on if sound is currently playing
    function handleClick() {
        if (emitClick) emitClick(index);

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
        >
            <span className={styles.title}>#{post.title}</span>
        </a>
    );
}
