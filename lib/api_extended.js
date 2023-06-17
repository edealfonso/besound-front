import { parseCookies } from 'nookies';
import { createPostAPI } from './api';

export async function createPost(url, title) {
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
            (blobFile) => new File([blobFile], filename, { type: 'audio/mp3' })
        );
    formData.append('audio', audioBlob, filename);

    // parse token
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
        // send request
        const responseData = await createPostAPI(token, formData);
        return responseData;
    }
}
