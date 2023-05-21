import { createTheme } from '@mui/material/styles';
import { GT_America } from './fonts';

export const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(128, 155, 112)'
        },
        text: {
            primary: 'rgb(112, 108, 115)'
        },
        secondary: {
            main: 'rgb(112, 108, 115)'
        },
        error: {
            main: '#eb4e44'
        }
    },
    typography: {
        fontFamily: GT_America.style.fontFamily,
        fontSize: 24,
        fontWeightRegular: 500
    },
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': {
                        borderBottomStyle: 'dashed',
                        borderBottomWidth: '2px'
                    },
                    '&:after': {
                        transition: 'none'
                    }
                },
                input: {
                    padding: '0 0 1px'
                }
            }
        }
    }
});
