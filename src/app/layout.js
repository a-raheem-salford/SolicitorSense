"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "../context/AuthContext";
import useHasMounted from "@/hooks/useHasMounted";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../lib/theme";
import { Poppins } from "next/font/google";
import "./globals.css";

const PUBLIC_ROUTES = ["/login", "/signup"];

const poppins = Poppins({
  weight: ["400", "500", "600", "700"], // choose weights you need
  subsets: ["latin"],
});

function AppLayout({ children }) {
  const hasMounted = useHasMounted();
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [redirecting, setRedirecting] = useState(true);
  const isPublic = PUBLIC_ROUTES.includes(pathname);
  const isPrivate = !isPublic;

  useEffect(() => {
    if (!hasMounted) return;

    if (!user && isPrivate) {
      router.replace("/login");
    } else if (user && isPublic) {
      router.replace("/chat");
    } else {
      setRedirecting(false);
    }
  }, [hasMounted, pathname, user]);

  if (!hasMounted || redirecting) return null;

  return <div style={{ height: "100vh" }}>{children}</div>;
}

export default function RootLayout({ children }) {
  const hasMounted = useHasMounted();
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={poppins.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            {hasMounted ? <AppLayout>{children}</AppLayout> : null}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
