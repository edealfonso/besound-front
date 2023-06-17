import '@/styles/globals.scss';
import { useEffect, useState } from 'react';

import { theme } from '@/lib/theme';
import { GT_America } from '@/lib/fonts';
import { AppProvider } from '@/lib/contexts/AppContext';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function App({ Component, pageProps }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState();

    useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light');
    }, [prefersDarkMode]);

    return (
        <AppProvider>
            <div className={GT_America.className}>
                <ThemeProvider theme={createTheme(theme(mode))}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </div>
        </AppProvider>
    );
}
