import Link from 'next/link';
import Info from '../common/Info';
import Box from '../common/Box';
import { useRouter } from 'next/router';
// import styles from './Step5.module.scss';

export default function Step5_Confirmation({ page }) {
    router = useRouter();

    const post = {
        id: '588754a2-cc8c-4ea3-9671-d9f7875e0631',
        title: 'Un título',
        audio: 'http://127.0.0.1:8000/media/audio/snippets07_s4Lk4jE.mp3'
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
