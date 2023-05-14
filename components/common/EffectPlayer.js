import { useState } from 'react';

import styles from './AudioPlayer.module.scss';

export default function EffectPlayer({ name, index, emitClick }) {
    const [played, setPlayed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // const [play, { sound, stop, duration }] = useSound(soundUrl, {
    //     // playbackRate: 0.3,
    //     volume: 0.25,
    //     interrupt: true
    // });

    const handleClick = async () => {
        emitClick(index);

        if (!isPlaying) {
            setIsPlaying(true);
            setPlayed(true);
            // play();
        } else {
            setIsPlaying(false);
            // stop();
        }
    };

    return (
        <a
            onClick={handleClick}
            className={`${styles.audioPlayer} ${played ? styles.played : ''} ${
                isPlaying ? styles.active : ''
            }`}
            id={name}
        >
            <span className={styles.title} data-title={`#${name}`}>
                #{name}
            </span>
        </a>
    );
}
