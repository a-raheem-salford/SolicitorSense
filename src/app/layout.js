"use client";

import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Sidebar from "../components/sidebar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import theme from "../lib/theme";
import "./globals.css";
import { useEffect } from "react";

const PUBLIC_ROUTES = ["/login", "/signup"];

function AppLayout({ children }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!user && !isPublic) {
      router.replace("/login"); // block unauthenticated
    }

    if (user && isPublic) {
      router.replace("/chat"); // block logged-in access to login/signup
    }
  }, [pathname, user]);

  const showSidebar = user && !isPublic;

  return (
    <Box sx={{ display: "flex" }}>
      {showSidebar && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <AppLayout>{children}</AppLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
