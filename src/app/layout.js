"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../lib/theme";
import "./globals.css";
import { Box } from "@mui/material";
import Sidebar from "@/components/sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
