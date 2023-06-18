import { useContext, useEffect, useRef, useState } from 'react';

import { AppContext } from '@/lib/contexts/AppContext';
import { AUDIO_MAX_DURATION } from '@/lib/constants';

import styles from './AudioPlayer.module.scss';

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
    const audio = useRef(null);

    function play() {
        audio.current.play();
    }

    function stop() {
        audio.current.pause();
    }

    function unload() {
        audio.current.srcObj = null;
    }

    function getDuration() {
        return audio.current.duration <= AUDIO_MAX_DURATION
            ? audio.current.duration
            : AUDIO_MAX_DURATION;
    }

    function getTime() {
        return audio.current.currentTime;
    }

    function isPlaying() {
        return !audio.current.paused;
    }

    function updateWidth() {
        if (isPlaying() && overlay.current) {
            overlay.current.style.width = `${
                (getTime() / getDuration()) * 105
            }%`;
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
        if (stopHomeSounds) {
            stopPlayer();
            unload();
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
            <audio
                ref={audio}
                controls
                src={post.audio}
                style={{ display: 'none' }}
                preload="none"
            >
                Your browser does not support the
                <code>audio</code> element.
            </audio>
            <div className={styles.titleWrap}>
                <span className={styles.base}>#{post.title}</span>
                <span className={styles.over} ref={overlay}>
                    <strong className={styles.inner}>#{post.title}</strong>
                </span>
            </div>
        </a>
    );
}
