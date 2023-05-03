import Head from "next/head";
import Layout from "@/components/common/Layout"
import { useState } from "react";

// import styles from "@/styles/pages/DeletePost.module.scss"

import { createPostAPI } from "@/lib/api"


export default function CreatePost({  }) {

    const [title, setTitle] = useState(null);
    const [audio, setAudio] = useState(null);
    const [APIResponse, setAPIResponse] = useState({
        status: '',
        statusText: ''
    });
    const [error, setError] = useState('');

    const handleSubmitPost = async (event) => {
        event.preventDefault();
        let formData = new FormData();

        // if (!title || !audio ) { // check if either field is empty
        //     setError('Some form field is missing'); // set error message
        //     return; // stop function execution
        // }
        // body.append("title", title);
        // body.append("audio", audio);

        formData.append("title", 'Un título2222');
        let blob = await fetch('http://127.0.0.1:8000/media/audio/Besound_db1_LNFAeVr.png')
            .then(r => r.blob())
            .then(blobFile => new File([blobFile], "Besound_db1_LNFAeVr.png", { type: "image/png" }));
        formData.append("audio", blob);

        const responseData = await createPostAPI(formData);

        console.log(responseData);

        setAPIResponse(responseData);

        // if (APIResponse.status == 'error'){
        //     setError(APIResponse.statusText);
        // }else if (APIResponse.status == 'success'){
        //     Router.push('/');  
        // }

    };



    return (
        <Layout>
            <Head>
                <title>{`Let's see`}</title>
            </Head>
            <section>
                <h3>API returned:</h3><br />
                {/* {APIResponse.status}<br />
                {APIResponse.statusText}<br /> */}

                <button onClick={handleSubmitPost} >Create post</button> 

            </section>
            <section>
                Error: {error}
            </section>
        </Layout>
    );
}
