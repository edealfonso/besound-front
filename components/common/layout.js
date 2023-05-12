import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

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
                {recordPage && <Header long={true} />}
                {homePage && <Header search={true} />}
                {!recordPage && !homePage && <Header />}

                {/* Main */}
                {recordPage && (
                    <main className={`${styles.main} ${styles.short}`}>
                        {children}
                    </main>
                )}
                {!recordPage && <main className={styles.main}>{children}</main>}

                <Footer />
            </div>
        </>
    );
}
