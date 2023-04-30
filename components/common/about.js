import Head from "next/head";
import styles from "./layout.module.scss";
import { AppContext } from "@/lib/context/state";

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { useContext } from "react";

export const siteTitle = "The Good Cream";
export const siteDescription = "The Good Cream";


export default function Layout({ children, home }) {
    const {veil} = useContext(AppContext);

    return (
        <div className={styles.mainContainer}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={siteDescription} />
                <meta name="og:title" content={siteTitle} />
                <title>{siteTitle}</title>
            </Head>

            <Header />

            <main className={styles.main}>{children}</main>

            {home && <Footer backLink={false} />}
            {!home && <Footer backLink={true} />}
            {veil && <div className={styles.veil}></div>}
            
        </div>
    );
}
