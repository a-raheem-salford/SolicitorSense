"use client";

import React from "react";
import { Box, Grid, useTheme, useMediaQuery } from "@mui/material";
import ChatPreviewSidebar from "../../components/auth/ChatPreviewSidebar";
import AuthForm from "../../components/auth/AuthForm";
import PublicRoute from "@/components/auth/PublicRoutes";

export default function LoginPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <PublicRoute>
      <Box sx={{ height: "100vh", overflow: "hidden" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid
            item
            xs={12}
            md={6} // 50% + 50% = 100%
            sx={{
              display: isMobile ? "none" : "block",
              height: "100vh",
              maxWidth: "50vw",
              minWidth: "50vw",
            }}
          >
            <ChatPreviewSidebar />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: { xs: "#f5f4ed", md: "transparent" },
              height: "100vh",
              borderLeft: { md: "1px solid #e9ecef" },
              width: { xs: "100vw", md: "50vw" },
              maxWidth: { xs: "100vw", md: "50vw" },
              minWidth: { xs: "100vw", md: "50vw" },
            }}
          >
            <AuthForm />
          </Grid>
        </Grid>
      </Box>
    </PublicRoute>
  );
}
