import Head from 'next/head';
import Layout from '@/components/Layout';

// import styles from "@/styles/pages/DeletePost.module.scss"

import { deletePostAPI } from '@/lib/api';
import Info from '@/components/common/Info';
import { useContext, useEffect } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';
import Link from 'next/link';

export async function getServerSideProps({ params }) {
    const APIResponse = await deletePostAPI(params.id);
    return {
        props: {
            APIResponse
        }
    };
}

export default function DeletePost({ APIResponse }) {
    const { recordPageStaticData } = useContext(AppContext);

    return (
        <Layout>
            <Head>
                <title>besound · DELETE</title>
            </Head>
            {APIResponse && APIResponse.status == 204 && (
                <Info>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: recordPageStaticData.delete_success
                        }}
                    />
                </Info>
            )}
            {!APIResponse ||
                (APIResponse.status !== 204 && (
                    <Info>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: recordPageStaticData.delete_ko
                            }}
                        />
                        <span>bs-{new Date().getTime().toString()}</span>
                    </Info>
                ))}
            <Link className="button" href="/">
                Home
            </Link>
        </Layout>
    );
}
