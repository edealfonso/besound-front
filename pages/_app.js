import '@/styles/globals.scss';
import { GT_America } from '@/lib/fonts';
import { AppProvider } from '@/lib/contexts/AppContext';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/lib/theme';

export default function App({ Component, pageProps }) {
    return (
        <AppProvider>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </AppProvider>
    );
    // return (
    //     <AppProvider>
    //         <ThemeProvider theme={theme}>
    //             <div className={GT_America.className}>
    //                 <Component {...pageProps} />
    //             </div>
    //         </ThemeProvider>
    //     </AppProvider>
    // );
}
