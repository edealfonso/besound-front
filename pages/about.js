import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

import { getAboutPageAPI } from '@/utils/api';

import Layout from '@/components/Layout';
import Info from '@/components/common/Info';
import Box from '@/components/common/Box';

export async function getServerSideProps() {
    const page = await getAboutPageAPI();
    return {
        props: {
            page
        }
    };
}

export default function AboutPage({ page }) {
    const router = useRouter();

    return (
        <Layout aboutPage>
            <Head>
                <title>besound · ABOUT</title>
            </Head>
            <Info highlight>
                <span
                    dangerouslySetInnerHTML={{
                        __html: page.intro_text
                    }}
                />
            </Info>
            <Box>
                <ul>
                    {page.steps.map((step, i) => {
                        return (
                            <li key={`step-${i}`}>
                                <Info box highlight={!step.image}>
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: step.text
                                        }}
                                    />
                                </Info>
                                {step.image && (
                                    <Info box>
                                        <Image
                                            src={step.image}
                                            width={150}
                                            height={90}
                                            alt={`Step ${i} icon`}
                                        />
                                    </Info>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </Box>
            <Info>
                <span
                    dangerouslySetInnerHTML={{
                        __html: page.ending_text_1
                    }}
                />
            </Info>
            <Info highlight>
                <span
                    dangerouslySetInnerHTML={{
                        __html: page.ending_text_2
                    }}
                />
            </Info>
            <Info>
                <button onClick={() => router.back()}>Close</button>
            </Info>
        </Layout>
    );
}
