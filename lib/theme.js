import { createTheme } from '@mui/material/styles';
// import GTAmerica from '@/styles/fonts/GT-America-Standard-Regular-Trial.woff2';

export const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(128, 155, 112)'
        },
        secondary: {
            main: 'rgb(112, 108, 115)'
        },
        error: {
            main: '#eb4e44'
        }
    },
    typography: {
        fontFamily: "'gt america trial', 'Times New Roman', Roboto, Helvetica",
        fontSize: 24
    }
    // components: {
    //     MuiCssBaseline: {
    //         styleOverrides: `
    //         @font-face {
    //             font-family: 'GT America';
    //             font-style: normal;
    //             font-display: swap;
    //             font-weight: 400;
    //             src: local('GT America'), local('GT America Trial'), url(${GTAmerica}) format('woff2');
    //             unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    //         }
    //         `
    //     }
    // }
});
