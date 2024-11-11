import { alpha, createTheme, getContrastRatio } from "@mui/material/styles";
// import { Plus_Jakarta_Sans } from "next/font/google";

// export const plus = Plus_Jakarta_Sans({
//   weight: ["300", "400", "500", "600", "700"],
//   subsets: ["latin"],
//   display: "swap",
//   fallback: ["Helvetica", "Arial", "sans-serif"],
// });

const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#2189ff",
      light: "#ECF2FF",
      dark: "#1a6dcc",
    },
    secondary: {
      main: "#49BEFF",
      light: "#E8F7FF",
      dark: "#23afdb",
    },
    success: {
      main: "#13DEB9",
      light: "#E6FFFA",
      dark: "#02b3a9",
      contrastText: "#ffffff",
    },
    info: {
      main: "#539BFF",
      light: "#EBF3FE",
      dark: "#1682d4",
      contrastText: "#ffffff",
    },
    error: {
      main: "#FA896B",
      light: "#FDEDE8",
      dark: "#f3704d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFAE1F",
      light: "#FEF5E5",
      dark: "#ae8e59",
      contrastText: "#ffffff",
    },

    bluebutton: {
      main: "#2189ff",
      light: alpha("#2189ff", 0.5),
      dark: alpha("#000000", 0.9),
      contrastText: getContrastRatio(alpha("#000000", 0.9), "#fff") > 4.5 ? "#fff" : "#111",
    },
    blackbutton: {
      main: alpha("#000000", 0.9),
      light: alpha("#000000", 0.5),
      dark: "#2189ff",
      contrastText: getContrastRatio(alpha("#000000", 0.9), "#fff") > 4.5 ? "#fff" : "#111",
    },
    blackiconbutton: {
      main: alpha("#000000", 0.9),
      light: "#2189ff",
      dark: "#2189ff",
      contrastText: getContrastRatio(alpha("#000000", 0.9), "#fff") > 4.5 ? "#fff" : "#111",
    },
    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#7C8FAC",
      500: "#5A6A85",
      600: "#2A3547",
    },
    text: {
      primary: "#1E1E1E",
      secondary: "#1E1E1E",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: {
      fontWeight: 600,
      // fontSize: "2.5rem",
      // lineHeight: "2.75rem",
      // fontFamily: plus.style.fontFamily,
    },
    h2: {
      fontWeight: 600,
      // fontSize: "1.875rem",
      // lineHeight: "2.25rem",
      // fontFamily: plus.style.fontFamily,
    },
    h3: {
      fontWeight: 600,
      // fontSize: "1.5rem",
      // lineHeight: "1.75rem",
      // fontFamily: plus.style.fontFamily,
    },
    h4: {
      fontWeight: 600,
      // fontSize: "1.3125rem",
      // lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      // fontSize: "1.125rem",
      // lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 600,
      // fontSize: "1rem",
      // lineHeight: "1.2rem",
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 500,
    },
    body1: {
      // fontSize: "0.875rem",
      fontWeight: 400,
      // lineHeight: "1.334rem",
    },
    body2: {
      // fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      // lineHeight: "1rem",
    },
    subtitle1: {
      // fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      // fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow:
            "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "0",
        },
      },
    },
  },
});

export { baselightTheme };
