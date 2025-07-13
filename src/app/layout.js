"use client";

import useHasMounted from "@/hooks/useHasMounted";
import { AuthProvider } from "@/context/AuthContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/lib/theme";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const hasMounted = useHasMounted();

  return (
    <html lang="en">
      <body suppressHydrationWarning className={poppins.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {hasMounted && <AuthProvider>{children}</AuthProvider>}
        </ThemeProvider>
      </body>
    </html>
  );
}
