import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        mode: "light",

        primary: {

            main: "#2563EB"

        },

        secondary: {

            main: "#7C3AED"

        },

        success: {

            main: "#16A34A"

        },

        warning: {

            main: "#F59E0B"

        },

        error: {

            main: "#DC2626"

        },

        background: {

            default: "#F8FAFC",

            paper: "#FFFFFF"

        }

    },

    typography: {

        fontFamily: [

            "Inter",

            "Roboto",

            "sans-serif"

        ].join(","),

        h3: {

            fontWeight: 700

        },

        h4: {

            fontWeight: 700

        },

        h5: {

            fontWeight: 600

        },

        h6: {

            fontWeight: 600

        },

        button: {

            textTransform: "none",

            fontWeight: 600

        }

    },

    shape: {

        borderRadius: 12

    },

    components: {

        MuiButton: {

            styleOverrides: {

                root: {

                    borderRadius: 10,

                    padding: "10px 20px"

                }

            }

        },

        MuiCard: {

            styleOverrides: {

                root: {

                    borderRadius: 16,

                    boxShadow:

                        "0 4px 12px rgba(0,0,0,0.08)"

                }

            }

        },

        MuiPaper: {

            styleOverrides: {

                root: {

                    borderRadius: 16

                }

            }

        },

        MuiTextField: {

            defaultProps: {

                fullWidth: true,

                variant: "outlined"

            }

        },

        MuiAppBar: {

            styleOverrides: {

                root: {

                    boxShadow: "none",

                    borderBottom: "1px solid #E5E7EB"

                }

            }

        }

    }

});

export default theme;