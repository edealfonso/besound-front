import Head from "next/head";
import styles from "./layout.module.scss";
import { AppContext } from "@/lib/context/state";

import Header from "./Header";
import Footer from "./Footer";
import { useContext } from "react";

export const siteTitle = "besound";
export const siteDescription = "Sound experiences to share";


export default function Layout({ children, recordPage, homePage }) {
    // const {veil} = useContext(AppContext);

    return (
        <div className={styles.mainContainer}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={siteDescription} />
                <meta name="og:title" content={siteTitle} />
                <title>{siteTitle}</title>
            </Head>

            {/* Header */}
            {recordPage && <Header long={true} />}
            {homePage && <Header search={true} />}
            {!recordPage && !homePage &&  <Header />}

            {/* Main */}
            {recordPage && <main className={`${styles.main} ${styles.short}`}>{children}</main>}
            {!recordPage && <main className={styles.main}>{children}</main>}
            
            <Footer />
        </div>
    );
}
