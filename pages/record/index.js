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

import { Player } from 'tone';

import styles from '@/styles/pages/Record.module.scss';

export async function getServerSideProps() {
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
    const { setRecordPageStaticData, recordingStep } = useContext(AppContext);

    useEffect(() => {
        if (recordingStep == 2) {
            setRecordingStatus('recording');
        } else {
            setRecordingStatus('inactive');
        }
    }, [recordingStep]);

    useEffect(() => {
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
        const player = new Player(blob).toDestination();

        // play as soon as the buffer is loaded
        player.autostart = true;
    };

    function handleChangeEffect(event, data) {
        console.log(event, data);
    }

    return (
        <Layout>
            {recordingStep == 1 && <Step1_Prepare page={page} />}
            {recordingStep == 2 && <Step2_Record page={page} />}
            {recordingStep == 3 && (
                <Step3_Effect
                    page={page}
                    emitChangeEffect={handleChangeEffect}
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
