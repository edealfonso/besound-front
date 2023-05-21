import { useContext, useEffect, useState } from 'react';
import { RecordContext } from '@/lib/contexts/RecordContext';

import styles from './AudioPlayer.module.scss';
import {
    addCaveEffect,
    addLoBatEffect,
    addRandomEffect,
    noEffect,
    toggleAudio
} from '@/lib/audio';

export default function EffectPlayer({ name, index }) {
    const { effect, setEffect } = useContext(RecordContext);

    const handleClick = async () => {
        if (effect == index) {
            await toggleAudio();
        } else {
            setEffect(index);
            await changeEffect(index);
        }
    };

    async function changeEffect(effect) {
        switch (effect) {
            case 0:
                await noEffect();
                break;

            case 1:
                await addCaveEffect();
                break;

            case 2:
                await addRandomEffect();
                break;

            case 3:
                await addLoBatEffect();
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
