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
    userPages,
    noPaddings
}) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, user-scalable=no"
                />
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
                {!homePage && (
                    <Header recordPage={recordPage} userPages={userPages} />
                )}

                {/* Main */}
                {homePage && (
                    <main className={`${styles.main} ${styles.footerSpace}`}>
                        {children}
                    </main>
                )}
                {recordPage && (
                    <main
                        className={`${styles.main} ${styles.footerSpace} ${styles.noHeader}`}
                    >
                        {children}
                    </main>
                )}
                {!homePage && !recordPage && (
                    <main className={styles.main}>{children}</main>
                )}

                {/* Footer */}
                {!userPages && <Footer />}
            </div>
        </>
    );
}
