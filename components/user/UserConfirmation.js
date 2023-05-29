import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import Info from '../common/Info';
import Box from '../common/Box';
import Layout from '../Layout';

import styles from './UserConfirmation.module.scss';

export default function UserConfirmation({ page, email }) {
    return (
        <Layout userPages>
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
            <Link className="button" href="/login">
                Log in
            </Link>
        </Layout>
    );
}
