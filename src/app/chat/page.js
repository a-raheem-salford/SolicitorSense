"use client";

import TopBar from "@/components/topbar/topbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ChatContent from "@/components/chat";
import { useState } from "react";

export default function ChatPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <ProtectedRoute>
      <TopBar onMenuClick={() => setMobileOpen(true)} />{" "}
      <ChatContent mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
    </ProtectedRoute>
  );
}
