import '@/styles/globals.scss';
import { GT_America } from '@/lib/fonts';
import { AppProvider } from '@/lib/contexts/AppContext';

export default function App({ Component, pageProps }) {
    return (
        <AppProvider>
            <div className={GT_America.className}>
                <Component {...pageProps} />
            </div>
        </AppProvider>
    );
}
