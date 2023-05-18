import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';

import Layout from '@/components/common/Layout';

import { getRecordPageAPI } from '@/lib/api';

import Step1_Prepare from '@/components/record/Step1_Prepare';
import Step2_Record from '@/components/record/Step2_Record';
import Step3_Effect from '@/components/record/Step3_Effect';
import Step4_Title from '@/components/record/Step4_Title';
import Step5_Confirmation from '@/components/record/Step5_Confirmation';

import dynamic from 'next/dynamic';
const AudioAnalyser = dynamic(import('react-audio-analyser'), { ssr: false }); // Async API cannot be server-side rendered

import styles from '@/styles/pages/Record.module.scss';
import {
    preparePlayer,
    noEffect,
    addCaveEffect,
    addRandomEffect,
    addLoBatEffect,
    toggleAudio
} from '@/lib/audio';

export async function getStaticProps() {
    const page = await getRecordPageAPI();
    return {
        props: {
            page
        }
    };
}

export default function Record({ page }) {
    const [windowSize, setWindowSize] = useState([0, 0]);
    const [recordingStatus, setRecordingStatus] = useState('');
    const [audioBlob, setAudioBlob] = useState(null);
    const { setRecordPageStaticData, recordingStep, setRecordingStep } =
        useContext(AppContext);

    useEffect(() => {
        if (recordingStep == 2) {
            setRecordingStatus('recording');
        } else {
            setRecordingStatus('inactive');
        }
    }, [recordingStep]);

    useEffect(() => {
        // set initial recording step
        setRecordingStep(1);

        // initially save data so that footer recordingStepper can use it
        setRecordPageStaticData(page);

        // set window sizes
        setWindowSize([window.innerWidth, window.innerHeight]);
    }, []);

    const saveFile = (e) => {
        const blob = window.URL.createObjectURL(e);

        // save blob
        setAudioBlob(blob);

        // start Tone.js
        preparePlayer(blob);
    };

    function handleChangeEffect(effect) {
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

    function handleToggleSound() {
        console.log('togge');
        toggleAudio();
    }

    return (
        <Layout>
            {recordingStep == 1 && <Step1_Prepare page={page} />}
            {recordingStep == 2 && <Step2_Record page={page} />}
            {recordingStep == 3 && (
                <Step3_Effect
                    page={page}
                    emitChangeEffect={handleChangeEffect}
                    emitToggleSound={handleToggleSound}
                />
            )}
            {recordingStep == 4 && <Step4_Title page={page} />}
            {recordingStep == 5 && <Step5_Confirmation page={page} />}
            <AudioAnalyser
                className={`${styles.audioAnalyzer} ${
                    recordingStep > 2 ? styles.hide : ''
                }`}
                status={recordingStatus}
                audioType="audio/mp3"
                backgroundColor="rgba(0, 0, 0, 0)"
                strokeColor="rgb(112, 108, 115)"
                width={2 * windowSize[0]}
                height={0.5 * windowSize[1]}
                stopCallback={saveFile}
            />
            <div className={styles.localData}>
                recordingStatus : {recordingStatus} <br />
                audioBlob : {audioBlob} <br />
            </div>
        </Layout>
    );
}
