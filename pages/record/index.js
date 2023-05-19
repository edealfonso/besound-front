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
import { preparePlayer, stopAudio } from '@/lib/audio';

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
    const [status, setStatus] = useState('');
    const [audioBlob, setAudioBlob] = useState(null);
    const [postTitle, setPostTitle] = useState(null);

    const {
        setRecordPageStaticData,
        recordingStep,
        setRecordingStep,
        effect,
        setEffect
    } = useContext(AppContext);

    useEffect(() => {
        // set status
        if (recordingStep == 2) {
            setStatus('recording');
        } else {
            setStatus('inactive');
        }

        // stop all audio when we move around steps
        stopAudio();
    }, [recordingStep]);

    useEffect(() => {
        // set initial recording recordingStep
        setRecordingStep(1);

        // initially save data so that footer recordingStepper can use it
        setRecordPageStaticData(page);

        // set window sizes
        setWindowSize([window.innerWidth, window.innerHeight]);
    }, []);

    function loadAudio(e) {
        const blob = window.URL.createObjectURL(e);

        // save value
        setAudioBlob(blob);

        // start Tone.js
        preparePlayer(blob);
    }

    function setTitle(title) {
        setPostTitle(title);
    }

    return (
        <Layout>
            {recordingStep == 1 && <Step1_Prepare page={page} />}
            {recordingStep == 2 && <Step2_Record page={page} />}
            {recordingStep == 3 && <Step3_Effect page={page} />}
            {recordingStep == 4 && (
                <Step4_Title
                    page={page}
                    emitTitle={setTitle}
                    blob={audioBlob}
                />
            )}
            {recordingStep == 5 && (
                <Step5_Confirmation
                    page={page}
                    title={postTitle}
                    audio={audioBlob}
                />
            )}
            <AudioAnalyser
                className={`${styles.audioAnalyzer} ${
                    recordingStep > 2 ? styles.hide : ''
                }`}
                status={status}
                audioType="audio/mp3"
                backgroundColor="rgba(0, 0, 0, 0)"
                strokeColor="rgb(112, 108, 115)"
                width={2 * windowSize[0]}
                height={0.5 * windowSize[1]}
                stopCallback={loadAudio}
            />
            <div className={styles.localData}>
                status : {status} <br />
                effect : {effect} <br />
            </div>
        </Layout>
    );
}
