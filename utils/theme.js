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
        fontWeightRegular: 500
    },
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    fontSize: 18,
                    '&:before': {
                        borderBottomStyle: 'dashed',
                        borderBottomWidth: '2px'
                    },
                    '&:after': {
                        transition: 'none'
                    }
                },
                input: {
                    padding: '3px 0',
                    fontSize: 18
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: 18,
                    top: '-4px!important'
                }
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: '#eb4e44',
                    fontSize: 12
                }
            }
        }
    }
});
