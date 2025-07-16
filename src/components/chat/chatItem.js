import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import Markdown from "react-markdown";
import Image from "next/image";

const ChatItem = ({ user, msg, name = "" }) => {
  const isAI = user === "AI";
  const displayName = "You";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        mb: 2,
        gap: 2,
        flexDirection: "row-reverse",
        background: isAI ? "transparent" : "#f0eee6",
        padding: "12px 20px",
        borderRadius: "10px",
        boxShadow: isAI ? "none" : "rgba(0, 0, 0, 0.04) 0px 3px 5px",
        animation: "showIn 0.2s cubic-bezier(0.88, 0.19, 0.37, 1.11) both",
        "@keyframes showIn": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      }}
    >
      {/* Chat Content */}
      <Box
        sx={{
          borderRadius: isAI ? "10px 10px 10px 0" : "10px 10px 0 10px",
          maxWidth: "100%",
          minWidth: "215px",
          wordBreak: "break-word",
        }}
      >
        {!isAI && (
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{ color: "#1e3c72", mb: 1 }}
          >
            {displayName}
          </Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          {isAI && (
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#1e3c72",
                fontSize: 14,
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              <Image src={"/chat_icon.png"} alt="logo" width={24} height={24} />
            </Avatar>
          )}

          <Box>
            <Markdown>{msg}</Markdown>
          </Box>
        </Box>
      </Box>

      {!isAI && (
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "#1e3c72",
            fontSize: 14,
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          {initials}
        </Avatar>
      )}
    </Box>
  );
};

export default ChatItem;
