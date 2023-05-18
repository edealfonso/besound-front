import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';

import styles from './AudioPlayer.module.scss';
import {
    addCaveEffect,
    addLoBatEffect,
    addRandomEffect,
    noEffect,
    toggleAudio
} from '@/lib/audio';

export default function EffectPlayer({ name, index }) {
    const { effect, setEffect } = useContext(AppContext);

    const handleClick = async () => {
        if (effect == index) {
            toggleAudio();
        } else {
            setEffect(index);
            changeEffect(index);
        }
    };

    function changeEffect(effect) {
        switch (effect) {
            case 0:
                noEffect();
                break;

            case 1:
                addCaveEffect();
                break;

            case 2:
                addRandomEffect();
                break;

            case 3:
                addLoBatEffect();
                break;
        }
    }

    return (
        <a
            onClick={handleClick}
            className={`${styles.audioPlayer} ${
                effect == index ? styles.active : ''
            }`}
            id={name}
        >
            <span className={styles.title} data-title={`#${name}`}>
                #{name}
            </span>
        </a>
    );
}
