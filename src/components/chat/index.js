"use client";

import {
  Box,
  InputBase,
  IconButton,
  Paper,
  Skeleton,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material";
import { AttachFile, Send } from "@mui/icons-material";
import useChat from "./useChat";
import ChatItem from "./chatItem";
import NoChatData from "./noChatData";
import Sidebar from "../sidebar/sidebar";
import Image from "next/image";
import { TypingIndicator } from "@/lib/helper";
import Toaster from "../common/toast";
import { Replay } from "@mui/icons-material";

export default function ChatContent() {
  const {
    chat,
    loading,
    messagesEndRef,
    onStateChange,
    msg,
    handleKeyPress,
    onMsgSend,
    fetchDataForSession,
    initiateNewChat,
    loadingList,
    sessionId,
    toast,
    setToast,
    setMsg,
    reload,
    handleReloadChat,
  } = useChat();

  return (
    <Sidebar
      sessionId={sessionId}
      fetchDataForSession={fetchDataForSession}
      initiateNewChat={initiateNewChat}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: 0,
        }}
      >
        {/* Chat Body */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            alignItems: chat?.length > 0 ? "baseline" : "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxHeight: "calc(100vh - 260px)",
              marginTop: chat?.length > 0 ? 3 : 0,
              maxWidth: "900px",
              marginRight: { sm: 0, md: "5rem" },
            }}
          >
            {loadingList ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton
                    key={i}
                    variant="rounded"
                    height={i % 2 ? 60 : 200}
                    sx={{ mb: 2 }}
                  />
                ))}
              </>
            ) : chat?.length > 0 ? (
              chat.map((itm) => (
                <ChatItem
                  key={itm._id}
                  user={itm.type}
                  msg={itm.msg}
                  image={itm.image}
                />
              ))
            ) : (
              <NoChatData onMsgSend={onMsgSend} setMsg={setMsg} />
            )}
            {(loading || reload) && (
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  alignItems: "flex-start",
                  animation: "fadeIn 0.5s ease-in-out 1s forwards",
                  padding: "10px 20px",
                  opacity: 0,
                  "@keyframes fadeIn": {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "#1e3c72",
                    fontSize: 14,
                    fontWeight: "bold",
                    marginRight: 2,
                  }}
                >
                  <Image
                    src={"/chat_icon.png"}
                    alt="logo"
                    width={26}
                    height={26}
                  />
                </Avatar>
                {loading ? (
                  <TypingIndicator
                    background={"transparent"}
                    width={10}
                    height={10}
                    boxShadow="none"
                  />
                ) : (
                  <Box>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Replay />}
                      onClick={handleReloadChat}
                      sx={{
                        background: "#dbeafe",
                        border: "1px solid #dbeafe",
                        borderRadius: "16px",
                        fontSize: "12px",
                      }}
                    >
                      Click Reload, Something went wrong
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            <div ref={messagesEndRef} />
          </Box>
        </Box>

        {/* Footer Input */}
        <Box
          sx={{
            bottom: 10,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            flexShrink: 0,
            marginTop: 6,
            padding: "0 16px",
          }}
        >
          <Paper
            component="form"
            elevation={0}
            sx={{
              marginRight: { sm: 0, md: "5rem" },
              display: "flex",
              alignItems: "flex-end",
              width: "100%",
              maxWidth: 900,
              px: 2,
              py: 1.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "primary.main",
                boxShadow: "0 6px 25px rgba(0, 0, 0, 0.12)",
              },
              "&:focus-within": {
                borderColor: "primary.main",
                boxShadow: "0 0 0 3px rgba(241, 90, 41, 0.1)",
              },
            }}
            onSubmit={(e) => {
              e.preventDefault();
              onMsgSend();
            }}
          >
            <InputBase
              placeholder="How can I help you today ?"
              fullWidth
              multiline
              minRows={3}
              maxRows={4}
              onChange={onStateChange}
              value={msg}
              onKeyDown={handleKeyPress}
              disabled={loading}
              sx={{
                flex: 1,
                mx: 1,
                color: "text.primary",
                fontSize: "16px",
                lineHeight: 1.5,
                "& .MuiInputBase-input": {
                  padding: "8px 0",
                  "&::placeholder": {
                    color: "text.secondary",
                    opacity: 0.7,
                  },
                },
              }}
            />

            <Box
              sx={{ display: "flex", alignItems: "flex-end", gap: 0.5, mr: 1 }}
            >
              <IconButton
                size="small"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <AttachFile size={20} />
              </IconButton>
            </Box>

            <IconButton
              type="submit"
              disabled={loading || !msg.trim()}
              sx={{
                backgroundColor: msg.trim() ? "#1e3c72" : "action.disabled",
                color: msg.trim() ? "#fff" : "text.disabled",
                width: 36,
                height: 36,
                borderRadius: 2,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: msg.trim() ? "#d14a20" : "action.disabled",
                  transform: msg.trim() ? "scale(1.05)" : "none",
                },
                "&:disabled": {
                  backgroundColor: "action.disabled",
                  color: "text.disabled",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={18} sx={{ color: "inherit" }} />
              ) : (
                <Send size={18} />
              )}
            </IconButton>
          </Paper>
        </Box>
      </Box>
      <Toaster toast={toast} setToast={setToast} />
    </Sidebar>
  );
}
