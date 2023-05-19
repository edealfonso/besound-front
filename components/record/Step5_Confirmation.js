import Link from 'next/link';
import Info from '../common/Info';
import Box from '../common/Box';
// import styles from './Step5.module.scss';

export default function Step5_Confirmation({ page, title, audio }) {
    const post = {
        id: '588754a2-cc8c-4ea3-9671-d9f7875e0631',
        title: title,
        audio: audio
    };

    return (
        <>
            <Box share_post={post}>
                <Info>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: page.confirmation_pre_title
                        }}
                    />
                </Info>
            </Box>

            <Info>
                <span
                    dangerouslySetInnerHTML={{
                        __html: page.confirmation_post_title
                    }}
                />
            </Info>
            <Link className="button" href="/">
                Home
            </Link>
            <Info warning>
                <Link
                    href="delete"
                    dangerouslySetInnerHTML={{
                        __html: page.confirmation_regret
                    }}
                ></Link>
            </Info>
            <Info highlight>
                <span
                    dangerouslySetInnerHTML={{
                        __html: page.confirmation_remember
                    }}
                />
            </Info>
        </>
    );
}
