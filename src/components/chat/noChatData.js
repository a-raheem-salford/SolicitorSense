import React from "react";
import Image from "next/image";
import { Box, Typography, Paper } from "@mui/material";
import { getTimeOfDay } from "@/lib/helper";
import { useAuth } from "@/context/AuthContext";
import { Gavel, Balance, WorkOutline, Description } from "@mui/icons-material";

const q1 = "What constitutes unfair dismissal under UK employment law?";
const q2 = "What are the legal requirements for redundancy payments in the UK?";
const q3 =
  "How does the Equality Act 2010 protect employees from discrimination?";
const q4 =
  "What are an employer's health and safety obligations towards employees?";

const NoChatData = ({ onMsgSend, setMsg }) => {
  const { user } = useAuth();
  const timeOfDay = getTimeOfDay();

  const getCardIcon = (index) => {
    switch (index % 4) {
      case 0:
        return <Gavel sx={{ fontSize: 24 }} />;
      case 1:
        return <Balance sx={{ fontSize: 24 }} />;
      case 2:
        return <WorkOutline sx={{ fontSize: 24 }} />;
      case 3:
        return <Description sx={{ fontSize: 24 }} />;
      default:
        return <Gavel sx={{ fontSize: 24 }} />;
    }
  };

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
        You can ask me anything related to UK law
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          flexWrap: "wrap",
          maxWidth: 800,
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
              minHeight: 140,
              bgcolor: "white",
              borderRadius: 3,
              cursor: "pointer",
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#1e3c72",
              fontWeight: 600,
              fontSize: { xs: 14, sm: 15 },
              textAlign: "center",
              border: "1px solid rgba(30, 60, 114, 0.1)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 24px rgba(30, 60, 114, 0.15)",
                borderColor: "rgba(30, 60, 114, 0.3)",
                "& .icon-container": {
                  transform: "scale(1.1)",
                  bgcolor: "#1e3c72",
                  "& svg": {
                    color: "white",
                  },
                },
              },
              userSelect: "none",
            }}
          >
            {/* Icon Container */}
            <Box
              className="icon-container"
              sx={{
                mb: 2,
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "#f0f4ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "all 0.3s ease",
              }}
            >
              {getCardIcon(index)}
            </Box>

            {/* Question Text */}
            <Box
              component="span"
              sx={{
                px: 1,
                lineHeight: 1.4,
              }}
            >
              {question}
            </Box>

            {/* Subtle Corner Decoration */}
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                width: 24,
                height: 24,
                borderRight: "2px solid #f0f4ff",
                borderBottom: "2px solid #f0f4ff",
                borderRadius: "0 0 8px 0",
                opacity: 0.7,
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default NoChatData;
