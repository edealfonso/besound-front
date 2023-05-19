import Link from 'next/link';
import Info from '../common/Info';
import Box from '../common/Box';
// import styles from './Step5.module.scss';
import { API_URL } from '@/lib/constants';
import { createPostAPI } from '@/lib/api';
import { useEffect, useState } from 'react';
import {
    castSound,
    fade_time,
    player,
    recorder,
    soundcastingPrepare,
    stopAudio
} from '@/lib/audio';

export default function Step5_Confirmation({ page, title }) {
    const [response, setResponse] = useState({
        status: '',
        statusText: ''
    });
    const [error, setError] = useState('');
    const [newPost, setNewPost] = useState({
        id: '',
        title: '',
        audio: ''
    });

    useEffect(() => {
        // if statement avoids double useEffect executions
        if (!response || response.status == '') {
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

        // send request
        const responseData = await createPostAPI(formData);

        // log and save response
        setResponse(responseData);
        console.log(responseData);

        // error handing
        if (responseData.status == '201') {
            setNewPost(responseData.data);
        } else {
            setError(responseData.statusText);
        }
    }

    function renderSendingData() {
        return (
            <Box>
                <Info highlight>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: page.confirmation_generating
                        }}
                    ></span>
                </Info>
            </Box>
        );
    }

    function renderResponseOK() {
        return (
            <>
                <Box share_post={newPost}>
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
                        href={`/delete/${newPost.id}`}
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
    }

    return (
        <>
            {(!response || response.status == '') && renderSendingData()}
            {response && response.status == 201 && renderResponseOK()}
        </>
    );
}
