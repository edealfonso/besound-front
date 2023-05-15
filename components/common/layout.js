import { useContext } from 'react';
import { AppContext } from '@/lib/contexts/AppContext';

import Head from 'next/head';

import Header from '../header/Header';
import Footer from '../footer/Footer';

import styles from './Layout.module.scss';

import { siteTitle, siteDescription } from '@/lib/constants';

export default function Layout({ children, recordPage, homePage, noPaddings }) {
    const { recordingStep } = useContext(AppContext);

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={siteDescription} />
                <meta name="og:title" content={siteTitle} />
                <title>{siteTitle}</title>
            </Head>
            <div
                className={`${styles.bodyContainer} ${
                    noPaddings ? styles.noPaddings : ''
                } ${recordingStep == 2 ? styles.noPaddings : ''}`}
            >
                {/* Header */}
                {recordingStep >= 1 && recordingStep <= 5 && (
                    <Header long={true} />
                )}
                {recordingStep == 0 && <Header search={true} />}
                {recordingStep == null && <Header />}

                {/* Main */}
                {recordingStep >= 1 && recordingStep <= 5 && (
                    <main className={`${styles.main} ${styles.short}`}>
                        {children}
                    </main>
                )}
                {recordingStep == 0 && (
                    <main className={styles.main}>{children}</main>
                )}
                {recordingStep == null && (
                    <main className={styles.main}>{children}</main>
                )}

                <Footer />
            </div>
        </>
    );
}
