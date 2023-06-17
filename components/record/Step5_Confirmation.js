import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Info from '../common/Info';
import Box from '../common/Box';
import ShareBox from './ShareBox';

import { RecordContext } from '@/lib/contexts/RecordContext';
import { AppContext } from '@/lib/contexts/AppContext';
import { createPostAPI } from '@/lib/api';
import {
    fade_time,
    player,
    soundcastingPrepare,
    endRecording
} from '@/lib/audio';

import { parseCookies } from 'nookies';
import AlertDialog from './AlertDialog';
import { createPost } from '@/lib/api_extended';
import Container from '../common/Container';

export default function Step5_Confirmation() {
    const router = useRouter();

    const { recordPageStaticData, isAlertOpen, setIsAlertOpen } =
        useContext(AppContext);
    const { title } = useContext(RecordContext);

    const [soundcastingStarted, setSoundcastingStarted] = useState(false);
    const [error, setError] = useState('');
    const [newPost, setNewPost] = useState(null);
    const recorder = useRef(null);

    useEffect(() => {
        setIsAlertOpen(false);

        // if statement avoids double useEffect executions

        if (!soundcastingStarted) {
            setSoundcastingStarted(true);

            const castAndPost = async () => {
                recorder.current = await soundcastingPrepare();
                setTimeout(() => {
                    player.onstop = function () {
                        // wait for audio to fade
                        setTimeout(async () => {
                            // end recording and save blob URL
                            const url = await endRecording(recorder.current);

                            // destroy instance
                            recorder.current = null;

                            // call
                            const response = await createPost(url, title);

                            // success/error handing
                            if (response?.status == '201') {
                                setNewPost(response.body);
                            } else {
                                setError(
                                    response ? (
                                        response.statusText
                                    ) : (
                                        <Info warning>
                                            Unknown error, please start process
                                            again
                                        </Info>
                                    )
                                );
                            }
                        }, fade_time + 200);
                    };
                }, 200);
            };

            castAndPost().catch(console.error);
        }
    }, []);

    function deletePost() {
        router.push(`/delete/${newPost.id}`);
    }

    function renderSendingData() {
        return (
            <Box>
                <Info highlight>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: recordPageStaticData.confirmation_generating
                        }}
                    ></span>
                </Info>
            </Box>
        );
    }

    function renderResponseOK() {
        return (
            <>
                <ShareBox post={newPost}>
                    <Info>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: recordPageStaticData.confirmation_pre_title
                            }}
                        />
                    </Info>
                </ShareBox>
                <Info>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: recordPageStaticData.confirmation_post_title
                        }}
                    />
                </Info>
                <Link href="/">
                    <button>Home</button>
                </Link>
                <Info warning>
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setIsAlertOpen(true);
                        }}
                        dangerouslySetInnerHTML={{
                            __html: recordPageStaticData.confirmation_regret
                        }}
                    ></div>
                </Info>
                <Info highlight>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: recordPageStaticData.confirmation_remember
                        }}
                    />
                </Info>
                <AlertDialog emitOk={deletePost} />
            </>
        );
    }

    return (
        <>
            {!newPost && renderSendingData()}
            {newPost && renderResponseOK()}
            {error && <>{error}</>}
        </>
    );
}
