// 'use client';

// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { Container, TextField, Button, Typography } from '@mui/material';

// export default function LoginPage() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" gutterBottom>Login</Typography>
//       <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
//       <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
//       <Button variant="contained" onClick={() => login(email, password)}>Login</Button>
//     </Container>
//   );
// }

"use client";

import React from "react";
import { Box, Grid, useTheme, useMediaQuery } from "@mui/material";
import ChatPreviewSidebar from "../../components/auth/ChatPreviewSidebar";
import AuthForm from "../../components/auth/AuthForm";

export default function LoginPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
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
            height: "100vh",
            borderLeft: { md: "1px solid #e9ecef" },
            maxWidth: "50vw",
            minWidth: "50vw",
          }}
        >
          <AuthForm />
        </Grid>
      </Grid>
    </Box>
  );
}
