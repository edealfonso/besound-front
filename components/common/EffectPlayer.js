import { useState } from 'react';

import styles from './AudioPlayer.module.scss';

export default function EffectPlayer({ name, index, emitClick, selected }) {
    // const [isPlaying, setIsPlaying] = useState(false);

    // const [play, { sound, stop, duration }] = useSound(soundUrl, {
    //     // playbackRate: 0.3,
    //     volume: 0.25,
    //     interrupt: true
    // });

    const handleClick = async () => {
        emitClick(index);

        // if (!isPlaying) {
        //     setIsPlaying(true);
        //     // play();
        // } else {
        //     setIsPlaying(false);
        //     // stop();
        // }
    };

    // return (
    //     <a
    //         onClick={handleClick}
    //         className={`${styles.audioPlayer} ${
    //             isPlaying ? styles.played : ''
    //         } ${selected ? styles.active : ''}`}
    //         id={name}
    //     >
    //         <span className={styles.title} data-title={`#${name}`}>
    //             #{name}
    //         </span>
    //     </a>
    // );

    return (
        <a
            onClick={handleClick}
            className={`${styles.audioPlayer} ${selected ? styles.active : ''}`}
            id={name}
        >
            <span className={styles.title} data-title={`#${name}`}>
                #{name}
            </span>
        </a>
    );
}
