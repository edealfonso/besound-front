import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

import { AppContext } from '@/utils/contexts/AppContext';
import { getAboutPageAPI } from '@/utils/api';

import Layout from '@/components/Layout';
import Info from '@/components/common/Info';
import Box from '@/components/common/Box';
import Container from '@/components/common/Container';

import styles from './About.module.scss';

export default function About() {
    const { isAboutOpen, setIsAboutOpen } = useContext(AppContext);
    const [isLoading, setLoading] = useState(false);
    const [page, setPage] = useState(null);
    const popup = useRef(null);

    const aboutToggle = () => {
        setIsAboutOpen((current) => !current);
    };

    useEffect(() => {
        setLoading(true);
        getData();
        async function getData() {
            const data = await getAboutPageAPI();
            setPage(data);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isAboutOpen) {
            popup.current.scroll({ top: 0, behavior: 'smooth' });
        }
    }, [isAboutOpen]);

    if (isLoading) return <p>Loading...</p>;
    if (!page) return <Container>No profile data</Container>;

    return (
        <div
            ref={popup}
            className={`${styles.aboutPopup} ${isAboutOpen ? styles.open : ''}`}
        >
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
                    <button onClick={aboutToggle}>Close</button>
                </Info>
            </Layout>
        </div>
    );
}
