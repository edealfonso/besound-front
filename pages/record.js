import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';

import { RecordProvider } from '@/lib/contexts/RecordContext';
import { AppContext } from '@/lib/contexts/AppContext';

import { getRecordPageAPI } from '@/lib/api';
import { preparePlayer, stopAudio } from '@/lib/audio';

import Layout from '@/components/Layout';
import Container from '@/components/common/Container';
import Step1_Prepare from '@/components/record/Step1_Prepare';
import Step2_Record from '@/components/record/Step2_Record';
import Step3_Effect from '@/components/record/Step3_Effect';
import Step4_Title from '@/components/record/Step4_Title';
import Step5_Confirmation from '@/components/record/Step5_Confirmation';

import dynamic from 'next/dynamic';
const AudioAnalyser = dynamic(import('react-audio-analyser'), { ssr: false }); // Async API cannot be server-side rendered

import nookies from 'nookies';

import styles from '@/styles/pages/RecordPage.module.scss';

export async function getServerSideProps(context) {
    const cookies = nookies.get(context);
    const token = cookies.token;

    if (token) {
        const data = await getRecordPageAPI(token);
        if (!data.error) {
            if (data.status == 200) {
                return {
                    props: {
                        page: data.body
                    }
                };
            }
        } else {
            return {
                props: {
                    error: data.error
                }
            };
        }
    }
    return {
        redirect: {
            permanent: false,
            destination: `/login`
        }
    };
}

export default function RecordPage({ page, error }) {
    const [recordingStatus, setRecordingStatus] = useState('');
    const [dimensions, setDimensions] = useState({
        height: typeof window !== 'undefined' && window.innerHeight,
        width: typeof window !== 'undefined' && window.innerWidth
    });

    const {
        recordPageStaticData,
        setRecordPageStaticData,
        recordingStep,
        setRecordingStep
    } = useContext(AppContext);

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

    // init
    useEffect(() => {
        // initially save data so that footer recordingStepper can use it
        setRecordPageStaticData(page);

        // set initial recording recordingStep
        setRecordingStep(1);

        // set window dimensions
        const handleResize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // start Tone.js
    function startToneJS(e) {
        const blob_URL = window.URL.createObjectURL(e);
        preparePlayer(blob_URL);
    }

    if (error) {
        return <Container>{error}</Container>;
    } else if (!recordPageStaticData) {
        return <Container>Loading</Container>;
    } else {
        return (
            <RecordProvider>
                <Layout
                    noPaddings={recordingStep == 2}
                    recordPage
                    footerStepper={recordingStep >= 3}
                >
                    <Head>
                        <title>besound · CREATE</title>
                    </Head>

                    {/* particular step elements */}
                    {recordingStep == 1 && <Step1_Prepare />}
                    {recordingStep == 2 && <Step2_Record />}
                    {recordingStep == 3 && <Step3_Effect />}
                    {recordingStep == 4 && <Step4_Title />}
                    {recordingStep == 5 && <Step5_Confirmation />}

                    {/* common elements */}
                    <AudioAnalyser
                        className={`${styles.audioAnalyzer} ${
                            recordingStep > 2 ? styles.hide : ''
                        }`}
                        status={recordingStatus}
                        audioType="audio/mp3"
                        backgroundColor="rgba(0, 0, 0, 0)"
                        strokeColor="rgb(112, 108, 115)"
                        width={2 * dimensions.width}
                        height={0.5 * dimensions.height}
                        stopCallback={startToneJS}
                    />
                </Layout>
            </RecordProvider>
        );
    }
}
