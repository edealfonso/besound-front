import Head from "next/head";
import Layout from "@/components/common/Layout"

// import styles from "@/styles/pages/DeletePost.module.scss"

import { deletePostAPI } from "@/lib/api"

export async function getServerSideProps({ params }) {
    const APIResponse = await deletePostAPI(params.id)
    return {
        props: {
            APIResponse,
        },
    }
}

export default function DeletePost({ APIResponse }) {
    console.log (APIResponse);
    return (
        <Layout>
            <Head>
                <title>{`Let's see`}</title>
            </Head>
            <section>
                <h3>API returned:</h3><br />
                {APIResponse.status}<br />
                {APIResponse.statusText}
            </section>
        </Layout>
    );
}
