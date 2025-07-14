import React from "react";
import Image from "next/image";
import { Box, Typography, Paper, Card, CardContent } from "@mui/material";
import { getTimeOfDay } from "@/lib/helper";
import { useAuth } from "@/context/AuthContext";

const q1 = "Which player has the most career blocks in the Finals?";
const q2 = "Who is the youngest player to score 10,000 points in NBA history?";
const q3 =
  "Which team holds the record for the most consecutive NBA championships?";
const q4 = "What is the highest-scoring game in NBA history?";

const NoChatData = ({ onMsgSend, setMsg }) => {
  const { user } = useAuth();
  const timeOfDay = getTimeOfDay();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 70,
          height: 70,
          mb: 1,
          position: "relative",
        }}
      >
        <Image
          priority
          src={"/logo.png"}
          alt="Logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>

      <Typography
        variant="h3"
        sx={{
          color: "#111111",
          fontStyle: "italic",
          fontWeight: 100,
          mt: 0,
          mb: 0.5,
          textAlign: "center",
        }}
      >
        {`Good ${timeOfDay}, ${user?.name || ""}`}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#5e6278",
          fontWeight: 500,
          mb: 3,
          textAlign: "center",
        }}
      >
        You can ask me anything related to Uk law.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          flexWrap: "wrap",
          maxWidth: 700,
          width: "100%",
          mt: 3,
          flexDirection: { xs: "column", md: "row" },
          p: 2,
        }}
      >
        {[q1, q2, q3, q4].map((question, index) => (
          <Paper
            key={index}
            onClick={() => {
              onMsgSend(question);
              setMsg(question);
            }}
            elevation={0}
            sx={{
              width: { xs: "100%", sm: "80%", md: "45%" },
              minHeight: 120,
              bgcolor: "white",
              borderRadius: 2,
              cursor: "pointer",
              p: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#1e3c72", // Using your primary color
              fontWeight: 600,
              fontSize: { xs: 14, sm: 15 },
              textAlign: "center",
              border: "1px solid rgba(30, 60, 114, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(30, 60, 114, 0.15)",
                borderColor: "rgba(30, 60, 114, 0.2)",
              },
              userSelect: "none",
            }}
          >
            {question}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default NoChatData;
