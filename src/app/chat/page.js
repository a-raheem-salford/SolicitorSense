"use client";

import { Typography, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export default function ChatPage() {
  const { user, logout } = useAuth();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Welcome {user?.email}
      </Typography>
      <Button variant="outlined" onClick={logout}>
        Logout
      </Button>
    </>
  );
}
