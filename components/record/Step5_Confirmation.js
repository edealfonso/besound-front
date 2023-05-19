import Link from 'next/link';
import Info from '../common/Info';
import Box from '../common/Box';
// import styles from './Step5.module.scss';
import { API_URL } from '@/lib/constants';
import { createPostAPI } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function Step5_Confirmation({ page, title, audio }) {
    const [response, setResponse] = useState({
        status: '',
        statusText: ''
    });
    const [error, setError] = useState('');

    const post = {
        id: '588754a2-cc8c-4ea3-9671-d9f7875e0631',
        title: title,
        audio: audio
    };

    useEffect(() => {
        // declare the async function
        const sendData = async () => {
            console.log('launch createPost');
            await createPost();
        };

        if (!response || response.status == '') {
            sendData().catch(console.error);
        }
    }, []);

    async function createPost() {
        // check if a required field is empty
        if (!title || !audio) {
            // set error message
            setError('Some form field is missing');
            // stop execution
            return;
        }

        // create form data container
        let formData = new FormData();

        // append data => title
        formData.append('title', title);

        // append data => audio
        // const timestamp = new Date().getTime().toString();
        // const filename = `audio-${timestamp}.mp3`;
        // let blob = await fetch('/dAR_ILLA17_v1_eq.mp3')
        //     .then((r) => r.blob())
        //     .then(
        //         (blobFile) =>
        //             new File([blobFile], filename, { type: 'audio/mp3' })
        //     );
        // formData.append('audio', blob);
        formData.append('audio', audio);

        // send request
        console.log('launch createPostAPI');

        const responseData = await createPostAPI(formData);

        console.log('get responseData');

        // log and save response
        console.log(responseData);
        setResponse(responseData);

        // error handing
        // if (APIResponse.status == 'error'){
        //     setError(APIResponse.statusText);
        // }else if (APIResponse.status == 'success'){
        //     Router.push('/');
        // }
    }

    function renderSendingData() {
        return (
            <Box>
                <Info>
                    <span>Sending data</span>
                </Info>
            </Box>
        );
    }

    function renderResponseOK() {
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
    }

    return (
        <>
            {(!response || response.status == '') && renderSendingData()}
            {response && response.status == 201 && renderResponseOK()}
        </>
    );
}
