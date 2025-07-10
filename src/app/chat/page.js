"use client";

import { Typography, Button, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "@/components/sidebar/sidebar";
import TopBar from "@/components/topbar/topbar";
import { useState } from "react";

export default function ChatPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const userId = user?.id ?? null;
  const sessionId = "current-session-id";

  const fetchDataForSession = (id) => {
    console.log("Fetching session:", id);
  };
  const initiateNewChat = () => {
    console.log("New chat created");
  };

  return (
    <>
      {" "}
      <TopBar onMenuClick={() => setMobileOpen(true)} />{" "}
      <Sidebar
        userId={userId}
        sessionId={sessionId}
        fetchDataForSession={fetchDataForSession}
        initiateNewChat={initiateNewChat}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      >
        <Box p="4">
          {" "}
          <>
            <Typography variant="h4" gutterBottom>
              Welcome {user?.email}
            </Typography>
            <Button variant="outlined" onClick={logout}>
              Logout
            </Button>
          </>
        </Box>
      </Sidebar>
    </>
  );
}
