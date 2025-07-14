"use client";

import TopBar from "@/components/topbar/topbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ChatContent from "@/components/chat";

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <TopBar onMenuClick={() => setMobileOpen(true)} /> <ChatContent />
    </ProtectedRoute>
  );
}
