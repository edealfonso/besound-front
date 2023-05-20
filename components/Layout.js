import { useContext, useEffect, useState } from 'react';
import { RecordContext } from '@/lib/contexts/RecordContext';

import Head from 'next/head';

import Header from './header/Header';
import Footer from './footer/Footer';

import styles from './Layout.module.scss';

import { siteTitle, siteDescription } from '@/lib/constants';

export default function Layout({ children, recordPage, homePage, noPaddings }) {
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
                }`}
            >
                {/* Header */}
                {homePage && <Header search={true} />}
                {recordPage && <Header long={true} />}
                {!homePage && !recordPage && <Header />}

                {/* Main */}
                {homePage && (
                    <main className={`${styles.main} ${styles.home}`}>
                        {children}
                    </main>
                )}
                {recordPage <= 5 && (
                    <main className={`${styles.main} ${styles.short}`}>
                        {children}
                    </main>
                )}
                {!homePage && !recordPage && (
                    <main className={styles.main}>{children}</main>
                )}

                <Footer />
            </div>
        </>
    );
}
