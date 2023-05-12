import '@/styles/globals.scss';
import { GT_America } from '@/lib/fonts';

export default function App({ Component, pageProps }) {
    return (
        <div className={GT_America.className}>
            <Component {...pageProps} />
        </div>
    );
}
