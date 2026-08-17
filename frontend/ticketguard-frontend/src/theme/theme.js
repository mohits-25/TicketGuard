import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4F46E5", // Indigo
      light: "#6366F1",
      dark: "#4338CA",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#7C3AED", // Violet
      light: "#8B5CF6",
      dark: "#6D28D9",
      contrastText: "#FFFFFF"
    },
    success: {
      main: "#10B981", // Emerald
      light: "#34D399",
      dark: "#059669"
    },
    warning: {
      main: "#F59E0B", // Amber
      light: "#FBBF24",
      dark: "#D97706"
    },
    error: {
      main: "#EF4444", // Rose / Red
      light: "#F87171",
      dark: "#DC2626"
    },
    info: {
      main: "#3B82F6",
      light: "#60A5FA",
      dark: "#2563EB"
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF"
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
      disabled: "#94A3B8"
    },
    divider: "#E2E8F0"
  },

  typography: {
    fontFamily: [
      "Plus Jakarta Sans",
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "sans-serif"
    ].join(","),
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.025em"
    },
    h2: {
      fontWeight: 800,
      letterSpacing: "-0.02em"
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.02em"
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.01em"
    },
    h5: {
      fontWeight: 700
    },
    h6: {
      fontWeight: 600
    },
    subtitle1: {
      fontWeight: 500
    },
    body1: {
      fontSize: "0.95rem",
      lineHeight: 1.6
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.01em"
    }
  },

  shape: {
    borderRadius: 16
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 22px",
          boxShadow: "none",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.3)",
            transform: "translateY(-1px)"
          },
          "&:active": {
            transform: "translateY(0)"
          }
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4338CA 0%, #4F46E5 100%)"
          }
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #6D28D9 0%, #7C3AED 100%)"
          }
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px"
          }
        }
      }
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.05)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden"
        }
      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.05)"
        },
        elevation1: {
          boxShadow: "0 4px 20px -2px rgba(15, 23, 42, 0.05)"
        },
        elevation4: {
          boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)"
        }
      }
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: "outlined"
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "#FFFFFF",
            transition: "all 0.2s ease-in-out",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#818CF8"
            },
            "&.Mui-focused": {
              boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.15)"
            }
          }
        }
      }
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: "0.75rem"
        }
      }
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(16px)",
          color: "#0F172A",
          boxShadow: "none",
          borderBottom: "1px solid rgba(226, 232, 240, 0.8)"
        }
      }
    }
  }
});

export default theme;