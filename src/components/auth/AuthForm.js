'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Divider,
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Google } from '@mui/icons-material';

export default function AuthForm() {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });

  const handleTabChange = (_, newValue) => setTabValue(newValue);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', loginForm);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signup:', signupForm);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 4
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3">{tabValue === 0 ? 'Welcome Back' : 'Get Started'}</Typography>
        <Typography variant="body1">
          {tabValue === 0 ? 'Access your legal AI assistant' : 'Create your account'}
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ backgroundColor: '#f8f9fa', borderRadius: 2, p: 0.5, mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': { textTransform: 'none', fontWeight: 500 },
            '& .MuiTabs-indicator': { display: 'none' }
          }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 3 }}
          />
          <Button type="submit" fullWidth variant="contained">Sign In</Button>
        </Box>
      )}

      {tabValue === 1 && (
        <Box component="form" onSubmit={handleSignup}>
          <TextField
            fullWidth
            label="Full Name"
            value={signupForm.name}
            onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={signupForm.email}
            onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={signupForm.password}
            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 3 }}
          />
          <Button type="submit" fullWidth variant="contained">Create Account</Button>
        </Box>
      )}

      <Box sx={{ position: 'relative', my: 3 }}>
        <Divider />
        <Typography variant="body2" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', px: 2 }}>
          or
        </Typography>
      </Box>

      <Button fullWidth variant="outlined" startIcon={<Google />} sx={{ mb: 3 }}>
        Continue with Google
      </Button>

      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
      </Typography>
    </Box>
  );
}
