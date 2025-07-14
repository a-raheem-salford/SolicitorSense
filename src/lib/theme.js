// src/lib/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#1e3c72",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "##faf9f5",
    },
  },
});

export default theme;
