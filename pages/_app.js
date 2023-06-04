import '@/styles/globals.scss';
import { AppProvider } from '@/lib/contexts/AppContext';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/lib/theme';
import { GT_America } from '@/lib/fonts';

export default function App({ Component, pageProps }) {
    return (
        <AppProvider>
            <div className={GT_America.className}>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </div>
        </AppProvider>
    );
}
