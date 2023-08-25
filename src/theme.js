import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  shape: {
    borderRadius: 24,
  },
  palette: {
    primary: {
      light: "#F3E4E4",
      main: "#C02A28",
      //main: "#E31C23",
    },
    secondary: {
      main: "#F3F4F3",
    },
    complementary: {
      main: "#282F41",
    },
    typography: {
      main: "white",
      text: "#252525",
    },
    common: {
      main: "white",
      white: "#FFFFFF",
      black: "#000000",
    },
    error: {
      main: red.A400,
    },
    success: {
      main: "#55AB42",
      light: "#97E489",
    },
  },
  typography: {
    fontFamily: [
      "Montserrat",
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    logoPopUps: {
      fontStyle: "monospace",
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "3.5rem",
      },
      fontWeight: 700,
    },
    labels: {
      fontSize: "0.9rem",
      "@media (min-width:600px)": {
        fontSize: "1.1rem",
      },
    },
    button: {
      fontSize: "0.6rem",

      "@media (min-width:350px)": {
        fontSize: "0.8rem",
      },
      "@media (min-width:600px)": {
        fontSize: "1rem",
      },
    },
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 350,
      sm: 600,
      md: 900,
      lg: 1290,
      xl: 1536,
    },
  },
});

export default theme;
