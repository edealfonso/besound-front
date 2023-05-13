import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from '@/lib/contexts/AppContext';

import Link from 'next/link';
import Layout from '@/components/common/Layout';
import Info from '@/components/common/Info';
import Box from '@/components/common/Box';

import { getRecordPageAPI } from '@/lib/api';
import AudioPlayer from '@/components/home/AudioPlayer';

export async function getServerSideProps() {
    const page = await getRecordPageAPI();
    return {
        props: {
            page
        }
    };
}

export default function Record({ page }) {
    const router = useRouter();
    const { recordingStep, setRecordPageStaticData } = useContext(AppContext);

    // initially save data so that footer stepper can use it
    setRecordPageStaticData(page);

    const post = {
        id: '588754a2-cc8c-4ea3-9671-d9f7875e0631',
        title: 'Un título',
        audio: 'http://127.0.0.1:8000/media/audio/snippets07_s4Lk4jE.mp3'
    };

    const renderStep = () => {
        switch (recordingStep) {
            case 1:
                return (
                    <>
                        <Info>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: page.step1_instruction
                                }}
                            />
                        </Info>
                    </>
                );
            case 2:
                return (
                    <>
                        <Info>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: page.step2_instruction
                                }}
                            />
                        </Info>
                    </>
                );
            case 3:
                return (
                    <>
                        <Info>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: page.step3_instruction
                                }}
                            />
                        </Info>
                    </>
                );
            case 4:
                return (
                    <>
                        <Info>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: page.step4_instruction
                                }}
                            />
                        </Info>
                    </>
                );
            case 5:
                return (
                    <>
                        <Box share_post={post}>
                            <Info>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: page.confirmation_pre_title
                                    }}
                                />
                            </Info>
                        </Box>

                        <Info>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: page.confirmation_post_title
                                }}
                            />
                        </Info>
                        <Link className="button" href="/">
                            Home
                        </Link>
                        <Info warning>
                            <Link
                                href="delete"
                                dangerouslySetInnerHTML={{
                                    __html: page.confirmation_regret
                                }}
                            ></Link>
                        </Info>
                        <Info highlight>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: page.confirmation_remember
                                }}
                            />
                        </Info>
                    </>
                );
            default:
                return null;
        }
    };

    return <Layout>{renderStep()}</Layout>;
}
