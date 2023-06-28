import { useContext, useEffect, useState } from 'react';

import { AppContext } from '@/lib/contexts/AppContext';
import { preparePlayer, stopAudio } from '@/lib/audio';
import { useWindowDimensions } from '@/lib/hooks/useWindowDimensions';

import dynamic from 'next/dynamic';
const AudioAnalyser = dynamic(import('react-audio-analyser'), { ssr: false }); // Async API cannot be server-side rendered
// const AudioAnalyser = dynamic(import('@/lib/react-audio-analyser'), {
//     ssr: false
// }); // Async API cannot be server-side rendered

import styles from './AudioRecorder.module.scss';
import { useMediaQuery } from '@mui/material';

export default function AudioRecorder() {
    const [recordingStatus, setRecordingStatus] = useState('');
    const { recordingStep } = useContext(AppContext);
    const dimensions = useWindowDimensions();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // on recordingStep change
    useEffect(() => {
        // update AudioAnalyser status
        if (recordingStep == 2) {
            setRecordingStatus('recording');
        } else {
            setRecordingStatus('inactive');
        }

        // stop all audio when we move around steps
        stopAudio();
    }, [recordingStep]);

    // start Tone.js library
    function startToneJS(e) {
        const blob_URL = window.URL.createObjectURL(e);
        preparePlayer(blob_URL);
    }

    return (
        <AudioAnalyser
            className={`${styles.analyzer} ${
                recordingStep <= 2 ? '' : styles.hide
            }`}
            status={recordingStatus}
            audioType="audio/mp3"
            backgroundColor="rgba(0, 0, 0, 0)"
            strokeColor={prefersDarkMode ? '#fffef9' :'rgb(112, 108, 115)'}
            width={2 * dimensions.width}
            height={0.5 * dimensions.height}
            stopCallback={startToneJS}
            // startCallback={(e) => {
            //     console.log('succ start', e);
            // }}
            // onRecordCallback={(e) => {
            //     console.log('recording', e);
            // }}
            // errorCallback={(e) => {
            //     console.log('error', err);
            // }}
        />
    );
}
