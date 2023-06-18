import { useContext, useEffect } from 'react';
import Head from 'next/head';

import { RecordProvider } from '@/lib/contexts/RecordContext';
import { AppContext } from '@/lib/contexts/AppContext';

import { getRecordPageAPI } from '@/lib/api';

import Layout from '@/components/Layout';
import Container from '@/components/common/Container';
import Step1_Prepare from '@/components/record/Step1_Prepare';
import Step2_Record from '@/components/record/Step2_Record';
import Step3_Effect from '@/components/record/Step3_Effect';
import Step4_Title from '@/components/record/Step4_Title';
import Step5_Confirmation from '@/components/record/Step5_Confirmation';
import AudioRecorder from '@/components/record/AudioRecorder';

import nookies from 'nookies';

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
    const {
        recordPageStaticData,
        setRecordPageStaticData,
        recordingStep,
        setRecordingStep
    } = useContext(AppContext);

    // on recordingStep change
    // useEffect(() => {
    //     // stop all audio when we move around steps
    //     stopAudio();
    // }, [recordingStep]);

    // init
    useEffect(() => {
        // initially save data so that footer recordingStepper can use it
        setRecordPageStaticData(page);

        // set initial recording recordingStep
        setRecordingStep(1);
    }, []);

    if (error) {
        return <Container>{error}</Container>;
    } else if (recordPageStaticData) {
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
                    {<AudioRecorder />}
                </Layout>
            </RecordProvider>
        );
    }
}
