import { useContext, useEffect, useState } from 'react';
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
    recorder,
    soundcastingPrepare,
    stopAudio
} from '@/lib/audio';

import { parseCookies } from 'nookies';
import AlertDialog from './AlertDialog';

export default function Step5_Confirmation() {
    const router = useRouter();

    const { recordPageStaticData, isAlertOpen, setIsAlertOpen } =
        useContext(AppContext);
    const { title } = useContext(RecordContext);

    const [soundcastingStarted, setSoundcastingStarted] = useState(false);
    const [error, setError] = useState('');
    const [newPost, setNewPost] = useState(null);

    useEffect(() => {
        setIsAlertOpen(false);

        // if statement avoids double useEffect executions
        if (!soundcastingStarted) {
            setSoundcastingStarted(true);
            castAndPost().catch(console.error);
        }
    }, []);

    const castAndPost = async () => {
        await soundcastingPrepare();
        setTimeout(soundcastingStopEventListener, 200);
    };

    function soundcastingStopEventListener() {
        player.onstop = function () {
            setTimeout(async () => {
                // stop audio
                stopAudio();

                // the recorded audio is returned as a blob
                const recording = await recorder.stop();

                // get blob url
                const url = URL.createObjectURL(recording);
                console.log('Tone.js Recorder Blob URL:', url);

                // dispose recorder
                await recorder.dispose();

                // create post from url
                await createPost(url);
            }, fade_time + 200);
        };
    }

    async function createPost(url) {
        // stop if a required field is empty
        if (!title || !url) {
            setError('Some form field is missing');
            return;
        }

        // create form data container
        let formData = new FormData();

        // append data => title
        formData.append('title', title);

        // append data => audio
        const timestamp = new Date().getTime().toString();
        const filename = `audio-${timestamp}.mp3`;
        let audioBlob = await fetch(url)
            .then((r) => r.blob())
            .then(
                (blobFile) =>
                    new File([blobFile], filename, { type: 'audio/mp3' })
            );
        formData.append('audio', audioBlob, filename);

        // parse token
        const cookies = parseCookies();
        const token = cookies.token;

        if (token) {
            // send request
            const responseData = await createPostAPI(token, formData);

            // error handing
            if (responseData.status == '201') {
                setNewPost(responseData.body);
            } else {
                setError(responseData.statusText);
            }
        } else {
            router.push('/login');
        }
    }

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
                <Link className="button" href="/">
                    Home
                </Link>
                <Info warning>
                    <div
                        style={{ cursor: pointer }}
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
        </>
    );
}
