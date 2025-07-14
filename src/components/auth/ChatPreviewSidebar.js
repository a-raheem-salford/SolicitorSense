"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Paper, Fade, Slide } from "@mui/material";
import { keyframes } from "@mui/system";
import Image from "next/image";
import { TypingIndicator } from "@/lib/helper";



export default function ChatPreviewSidebar() {
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  const text = "SolicitorSense — Smarter Legal Guidance";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const typeNext = () => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i < text.length) {
        setTimeout(typeNext, 80);
      }
    };

    typeNext();

    return () => {};
  }, [text]);

  const conversation = [
    {
      type: "user",
      content: "I need help with a contract review for my business.",
      delay: 1000,
    },
    {
      type: "bot",
      content:
        "I'd be happy to help you with contract review. Could you tell me what type of contract you're working with?",
      delay: 2500,
    },
    {
      type: "user",
      content:
        "It's a service agreement with a new vendor. I'm concerned about the liability clauses.",
      delay: 4000,
    },
    {
      type: "bot",
      content:
        "Liability clauses are crucial in service agreements. I can help you identify potential risks and suggest protective language. Would you like me to walk you through the key points to review?",
      delay: 6000,
    },
    {
      type: "user",
      content: "Yes, that would be very helpful. What should I look for first?",
      delay: 8000,
    },
    {
      type: "bot",
      content:
        "Let's start with three key areas: 1) Limitation of liability caps, 2) Indemnification clauses, and 3) Insurance requirements. These form the foundation of your protection.",
      delay: 10000,
    },
  ];

  useEffect(() => {
    if (index < conversation.length) {
      const message = conversation[index];

      const timer = setTimeout(() => {
        if (message.type === "bot" && index > 0) {
          setShowTyping(true);

          setTimeout(() => {
            setShowTyping(false);
            setMessages((prev) => [...prev, message]);
            setIndex((prev) => prev + 1);
          }, 1500);
        } else {
          setMessages((prev) => [...prev, message]);
          setIndex((prev) => prev + 1);
        }
      }, message.delay);

      return () => clearTimeout(timer);
    } else {
      const reset = setTimeout(() => {
        setMessages([]);
        setIndex(0);
        setShowTyping(false);
      }, 3000);
      return () => clearTimeout(reset);
    }
  }, [index]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#f5f4ed",
        p: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Image src={"/logo.png"} alt="logo" width={30} height={30} />
        <Typography
          variant="h4"
          color="#1e3c72"
          fontWeight={"bold"}
          fontSize={"1.5rem"}
          marginTop={"4px"}
          ml={1}
        >
          SolicitorSense
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          overflow: "hidden",
          p: 3,
          background: "transparent",
        }}
      >
        <Box sx={{ my: 2 }}>
          <Typography
            variant="h3"
            sx={{
              color: "#2c3e50",
              fontWeight: 700,
              mb: 0.5,
              color: "#1e3c72",
              minHeight: "140px",
            }}
          >
            {displayed}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#6c757d",
            }}
          >
            SolicitorSense gives you instant legal insights, document help, and
            trusted guidance anytime.
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            mb: 5,
            pb: 2,
            fontStyle: "italic",
            color: "#2a5298",
          }}
        >
          AI Assistant Preview
        </Typography>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "hidden",
            maxHeight: "500px",
            zoom: "80%",
            maxWidth: "70%",
            minWidth: "70%",
            margin: "auto",
            marginTop: "40px",
          }}
        >
          {messages.map((msg, i) => (
            <Slide key={i} direction="up" in timeout={600}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  flexDirection: msg.type === "user" ? "row-reverse" : "row",
                  textAlign: msg.type === "user" ? "right" : "left",
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: msg.type === "user" ? "#1e3c72" : "white",
                    color:"white"
                  }}
                >
                  {msg.type === "user" ? (
                    "Y"
                  ) : (
                    <Image
                      src={"/small_logo.png"}
                      alt="logo"
                      width={24}
                      height={24}
                    />
                  )}
                </Avatar>
                <Box
                  sx={{
                    backgroundColor: msg.type === "user" ? "#1e3c72" : "#fff",
                    color: msg.type === "user" ? "#fff" : "#2c3e50",
                    p: 1.5,
                    borderRadius: 3,
                    maxWidth: "70%",
                  }}
                >
                  {msg.content}
                </Box>
              </Box>
            </Slide>
          ))}

          {showTyping && (
            <Fade in>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Avatar
                  sx={{ width: 32, height: 32, backgroundColor: "white" }}
                >
                  <Image
                    src={"/small_logo.png"}
                    alt="logo"
                    width={24}
                    height={24}
                  />
                </Avatar>
                <TypingIndicator />
              </Box>
            </Fade>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
