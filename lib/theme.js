import { GT_America } from './fonts';

export function getTheme(mode) {
    return {
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                      // palette values for light mode
                      primary: {
                          main: 'rgb(128, 155, 112)'
                      },
                      text: {
                          primary: '#403f40'
                      },
                      secondary: {
                          main: 'rgb(112, 108, 115)'
                      },
                      error: {
                          main: '#eb4e44'
                      }
                  }
                : {
                      // palette values for dark mode
                      primary: {
                          main: '#a3a0a6'
                      },
                      text: {
                          primary: '#fffef9'
                      },
                      secondary: {
                          main: '#a3a0a6'
                      },
                      error: {
                          main: '#eb4e44'
                      }
                  })
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
                        },
                        '&.Mui-error': {
                            color: '#eb4e44'
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
                        width: '2em',
                        marginBottom: '0.4em'
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
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        maxWidth: 350,
                        margin: '20px'
                    }
                }
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        fontSize: 20
                    }
                }
            },
            MuiDialogContentText: {
                styleOverrides: {
                    root: {
                        fontSize: 16
                    }
                }
            },
            MuiDialogActions: {
                styleOverrides: {
                    root: {
                        gap: '1rem',
                        padding: '20px 24px',
                        justifyContent: 'space-between'
                    }
                }
            }
        }
    };
}
