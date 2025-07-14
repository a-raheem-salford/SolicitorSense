import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import Markdown from "react-markdown";
import Image from "next/image";

const ChatItem = ({ user, msg, name = "" }) => {
  const isAI = user === "AI";
  const displayName = isAI ? (
    <Image src={"/small_logo.png"} alt="logo" width={24} height={24} />
  ) : (
    "You"
  );
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: isAI ? "flex-start" : "flex-end",
        alignItems: "flex-start",
        mb: 2,
        gap: 2,
        flexDirection: isAI ? "row" : "row-reverse",
        background: isAI ? "transparent" : "#f0eee6",
        padding: "12px 20px",
        borderRadius: "10px",
        boxShadow: isAI ? 0 : "rgba(0, 0, 0, 0.04) 0px 3px 5px;",

        animation: "showIn 0.2s cubic-bezier(0.88, 0.19, 0.37, 1.11) both",
        "@keyframes showIn": {
          "0%": {
            transform: "scale(0)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      }}
    >
      {/* Chat Content */}
      <Box
        sx={{
          borderRadius: isAI ? "10px 10px 10px 0" : "10px 10px 0 10px",
          maxWidth: "100%",
          minWidth: "215px",
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight={700}
          sx={{ color: "#1e3c72" }}
        >
          {displayName}
        </Typography>
        <Box
          sx={{
            wordBreak: "break-word",
            marginTop: 1.5,
            "& p": { margin: 0, padding: 0 },
          }}
        >
          <Markdown>{msg}</Markdown>
        </Box>
      </Box>

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
    </Box>
  );
};

export default ChatItem;
