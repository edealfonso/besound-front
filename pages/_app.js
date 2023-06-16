import '@/styles/globals.scss';
import { AppContext, AppProvider } from '@/lib/contexts/AppContext';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme, theme } from '@/lib/theme';
import { GT_America } from '@/lib/fonts';
import { useContext, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material/styles';

export default function App({ Component, pageProps }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState();

    useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light');
    }, [prefersDarkMode]);

    return (
        <AppProvider>
            <div className={GT_America.className}>
                <ThemeProvider theme={createTheme(getTheme(mode))}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </div>
        </AppProvider>
    );
}
