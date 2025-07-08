"use client";

import { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";

export default function HomePage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Client-side rendering only.");
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to SolicitorSense (Client-Only)
      </Typography>
      <Typography variant="body1">
        This page is rendered only on the client.
      </Typography>
      <Button
        variant="contained"
        onClick={() => setCount(count + 1)}
        sx={{ mt: 2 }}
      >
        Clicked {count} times
      </Button>
    </Container>
  );
}
