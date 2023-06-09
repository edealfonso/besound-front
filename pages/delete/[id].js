import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import { AppContext } from '@/lib/contexts/AppContext';
import { deletePostAPI } from '@/lib/api';

import Layout from '@/components/Layout';
import Info from '@/components/common/Info';

import nookies from 'nookies';

export async function getServerSideProps(context) {
    const cookies = nookies.get(context);
    const token = cookies.token;

    if (token) {
        const APIResponse = await deletePostAPI(token, context.params.id);
        return {
            props: {
                APIResponse
            }
        };
    }
    return {
        redirect: {
            permanent: false,
            destination: `/login`
        }
    };
}

export default function DeletePage({ APIResponse }) {
    const router = useRouter();
    const { recordPageStaticData } = useContext(AppContext);

    // redirect to record page if not visited yet
    // (user shouldn't be here)
    useEffect(() => {
        if (!recordPageStaticData) {
            router.push('/record');
        }
    }, []);

    console.log('APIResponse', APIResponse);

    return (
        <>
            {recordPageStaticData && (
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
                                <span>
                                    bs-{new Date().getTime().toString()}
                                </span>
                            </Info>
                        ))}
                    <Link href="/">
                        <button>Home</button>
                    </Link>
                </Layout>
            )}
        </>
    );
}
