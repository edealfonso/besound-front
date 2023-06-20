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
        var playPromise = audio.current.play();

        // In browsers that don’t yet support this functionality,
        // playPromise won’t be defined.
        if (playPromise !== undefined) {
            playPromise
                .then(function () {
                    console.log('Automatic playback started!');
                    // Automatic playback started!
                })
                .catch(function (error) {
                    console.log('Automatic playback failed!');
                    audio.current?.play();

                    // Automatic playback failed.
                    // Show a UI element to let the user manually start playback.
                });
        }
    }

    function stop() {
        audio.current?.pause();
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
            audio.current = new Audio(post.audio);
            audio.current.load();
            console.log('Loading...');
        }
    }, []);

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
        console.log('handleClick');

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
        console.log('play');

        play();
    }

    function stopPlayer() {
        cancelAnimationFrame(animation.current);
        setIsActive(false);
        console.log('stop');

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
