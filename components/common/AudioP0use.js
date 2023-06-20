import { useContext, useEffect, useRef, useState } from 'react';

import useSound from 'use-sound';

import styles from './AudioPlayer.module.scss';
import { AppContext } from '@/lib/contexts/AppContext';

export default function AudioPlayer({
    post,
    selected,
    index,
    emitClick,
    independent
}) {
    const overlay = useRef(null);
    const animation = useRef(null);
    const { stopHomeSounds } = useContext(AppContext);

    const [isActive, setIsActive] = useState(false);
    const [played, setPlayed] = useState(independent);

    // define useSound
    const [play, { stop, sound }] = useSound(post.audio, {
        interrupt: true
    });

    console.log('usesound', post.audio);

    function updateWidth() {
        if (sound.playing() && overlay.current) {
            let width = (sound.seek() / sound.duration()) * 100;
            overlay.current.style.width = `${width}%`;
            animation.current = window.requestAnimationFrame(updateWidth);
        } else {
            window.cancelAnimationFrame(animation.current);
        }
    }

    // turn off when another sound is selected
    useEffect(() => {
        if (!selected) {
            stopPlayer();
        } else {
            startPlayer();
        }
    }, [selected]);

    // stop audio when we move to another page
    useEffect(() => {
        if (stopHomeSounds && sound) {
            stopPlayer();
            sound.unload();
        }
    }, [stopHomeSounds]);

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
        animation.current = window.requestAnimationFrame(updateWidth);
        setPlayed(true);
        setIsActive(true);
        play();
    }

    function stopPlayer() {
        cancelAnimationFrame(animation.current);
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
            <div className={styles.titleWrap}>
                <span className={styles.base}>#{post.title}</span>
                <span className={styles.over} ref={overlay}>
                    <strong className={styles.inner}>#{post.title}</strong>
                </span>
            </div>
            <audio
                controls
                src={post.audio.replace('https', 'http')}
                style={{ display: 'none' }}
            >
                Your browser does not support the
                <code>audio</code> element.
            </audio>
        </a>
    );
}
