"use client";
import { useEffect } from 'react';
import useHasMounted from "@/hooks/useHasMounted";
import { AuthProvider } from "@/context/AuthContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/lib/theme";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--poppins-font",
});

export default function RootLayout({ children }) {
  const hasMounted = useHasMounted();

  useEffect(() => {
    document.title = "SolicitorSense - AI Legal Assistant";
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'AI-powered legal assistance for UK law';
    document.head.appendChild(metaDescription);
    
    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1e3c72" />
      </head>
      <body suppressHydrationWarning className={poppins.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {hasMounted && <AuthProvider>{children}</AuthProvider>}
        </ThemeProvider>
      </body>
    </html>
  );
}