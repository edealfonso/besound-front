import { useContext, useRef } from 'react';
import { RecordContext } from '@/lib/contexts/RecordContext';

import stylesAudioPlayer from '../common/AudioPlayer.module.scss';
import styles from './EffectPlayer.module.scss';

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
            className={`${stylesAudioPlayer.audioPlayer} ${
                effect == index ? stylesAudioPlayer.activeForce : ''
            }`}
            id={name}
        >
            <div
                className={`${stylesAudioPlayer.titleWrap} ${styles.noPadding} `}
            >
                <span className={stylesAudioPlayer.base}>#{name}</span>
            </div>
        </a>
    );
}
