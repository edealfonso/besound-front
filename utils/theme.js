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
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: 18,
                    '&:before': {
                        borderBottom: '2px dashed #706c73!important'
                    },
                    '&:after': {
                        transition: 'none!important'
                    }
                },
                input: {
                    padding: '3px 0',
                    fontSize: 18
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: 18
                },
                standard: {
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
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        boxShadow: 'none',
                        backgroundColor: 'rgb(112, 108, 115)'
                    }
                }
            }
        },
        MuiInputAdornment: {
            styleOverrides: {
                positionEnd: {
                    width: '2em'
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                inputRoot: {
                    overflow: 'hidden'
                },
                endAdornment: {
                    width: '1.45em'
                },
                root: {
                    '& label': {
                        top: '0px!important'
                    }
                }
            }
        }
    }
});
