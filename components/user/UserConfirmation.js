import Link from 'next/link';
import Head from 'next/head';

import Layout from '../Layout';
import Info from '../common/Info';
import Box from '../common/Box';

import styles from './UserConfirmation.module.scss';

export default function UserConfirmation({ page, email }) {
    return (
        <Layout userPages>
            <Head>
                <title>besound · REGISTER · Confirmation</title>
            </Head>
            <Box>
                <Info>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: page.confirmation_pre
                        }}
                    />
                </Info>
                <div className={styles.bigDisplay}>{email}</div>
            </Box>
            <Info>
                <span
                    dangerouslySetInnerHTML={{
                        __html: page.confirmation_post
                    }}
                />
            </Info>
            <Link href="/login" style={{ display: 'inline' }}>
                <button>Log in</button>
            </Link>
        </Layout>
    );
}
