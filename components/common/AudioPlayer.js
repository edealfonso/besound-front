import { useEffect, useState } from 'react';
import useSound from 'use-sound';

import styles from './AudioPlayer.module.scss';

export default function AudioPlayer({
    post,
    selected,
    index,
    emitClick,
    independent
}) {
    const [isActive, setIsActive] = useState(false);
    const [played, setPlayed] = useState(independent);

    // define useSound
    const [play, { stop, duration }] = useSound(post.audio, {
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

        if (!isActive) {
            startPlayer();
        } else {
            stopPlayer();
        }
    }

    function startPlayer() {
        setPlayed(true);
        setIsActive(true);

        play();
    }

    function stopPlayer() {
        setIsActive(false);

        stop();
    }

    return (
        <a
            onClick={handleClick}
            className={`${styles.audioPlayer} ${played ? styles.played : ''} ${
                isActive ? styles.active : ''
            }`}
        >
            <span className={styles.title}>#{post.title}</span>
        </a>
    );
}
