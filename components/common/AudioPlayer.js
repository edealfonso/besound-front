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
        // audio.current.srcObj = null;
        audio.current.destroy();
    }

    function getDuration() {
        // if browser is still figuring out this value,
        // return half maximum duration
        return audio.current.duration <= AUDIO_MAX_DURATION
            ? audio.current.duration
            : AUDIO_MAX_DURATION / 2;
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

    // load audio on first mount
    useEffect(() => {
        if (!audio.current) {
            console.log('Will load audio in', post.audio);
            audio.current = document.createElement('audio');
            audio.current.type = 'audio/mpeg';
            audio.current.src = post.audio;
            audio.current.load();
            console.log('Loading...');
            audio.current.onloadeddata = () => {
                console.log('Loaded');
            };
        }
    }, []);

    // turn off when another sound is selected
    useEffect(() => {
        if (audio.current.readyState) {
            console.log('turn off when another sound is selected');
            if (!selected) {
                stopPlayer();
            } else {
                startPlayer();
            }
        }
    }, [selected]);

    // stop audio when we move to another page
    useEffect(() => {
        console.log('stop audio when we move to another page');
        if (audio.current.readyState) {
            if (stopHomeSounds) {
                stopPlayer();
                unload();
            }
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
        if (!played || audio.current?.ended) {
            console.log('Never played or ended');
            audio.current.pause();
            console.log('Paused');

            audio.current.currentTime = 0;
            console.log('reinitialized');
        }
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
        </a>
    );
}
