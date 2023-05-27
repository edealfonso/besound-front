import Head from 'next/head';

import { siteTitle, siteDescription } from '@/lib/constants';

import Header from './header/Header';
import HeaderHome from './header/HeaderHome';
import Footer from './footer/Footer';

import styles from './Layout.module.scss';

export default function Layout({
    children,
    recordPage,
    homePage,
    aboutPage,
    noPaddings
}) {
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
                {homePage && <HeaderHome />}
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

                {/* Footer */}
                {!aboutPage && <Footer />}
            </div>
        </>
    );
}
