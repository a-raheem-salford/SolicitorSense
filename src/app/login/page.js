'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Container, TextField, Button, Typography } from '@mui/material';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
      <Button variant="contained" onClick={() => login(email, password)}>Login</Button>
    </Container>
  );
}
