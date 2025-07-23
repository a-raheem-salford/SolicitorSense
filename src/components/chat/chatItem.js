import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Tooltip,
  Chip,
} from "@mui/material";
import Markdown from "react-markdown";
import Image from "next/image";
import {
  Attachment,
  CheckCircle,
  Warning,
  Error,
  AccessTime,
} from "@mui/icons-material";

const ChatItem = ({
  index,
  user,
  msg,
  hasDocuments = false,
  documentNames = [],
  documentCount = 0,
  documentResults = [],
}) => {
  const isAI = user === "AI";
  const displayName = "You";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("");

  // Generate document feedback for AI messages
  const getDocumentFeedback = () => {
    if (
      !isAI ||
      !hasDocuments ||
      documentResults.length === 0
    ) {
      return null;
    }

    // Only show feedback if we have actual document processing data
    const hasProcessingData = documentResults.some(
      (d) => d.hasOwnProperty("processed") && d.hasOwnProperty("irrelevant")
    );

    if (!hasProcessingData) {
      return null; // Skip feedback for old messages
    }
    const irrelevantDocs = documentResults.filter((d) => d.irrelevant);
    const validDocs = documentResults.filter((d) => d.processed);
    const errorDocs = documentResults.filter(
      (d) => !d.processed && !d.irrelevant
    );

    // Success case - all documents processed
    if (
      irrelevantDocs.length === 0 &&
      errorDocs.length === 0 &&
      validDocs.length > 0
    ) {
      return (
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            bgcolor: "#e8f5e8",
            borderLeft: "4px solid #4caf50",
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: "#2e7d32", fontSize: 12 }}>
            ✅ Analysis based on {validDocs.length} uploaded document(s)
          </Typography>
        </Box>
      );
    }

    // All documents irrelevant
    if (irrelevantDocs.length === documentCount) {
      return (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "#fff3cd",
            borderLeft: "4px solid #ffc107",
            borderRadius: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "#856404", mb: 0.5 }}
          >
            📄 Document Notice:
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#856404", lineHeight: 1.4 }}
          >
            {`All ${irrelevantDocs.length} uploaded document(s) (
            ${irrelevantDocs.map((d) => d.filename).join(", ")}) don't appear to
            be related to UK legal matters. Please upload UK employment
            contracts, policies, or other UK legal documents for analysis.`}
          </Typography>
        </Box>
      );
    }

    // Some documents irrelevant
    if (irrelevantDocs.length > 0) {
      return (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "#d1ecf1",
            borderLeft: "4px solid #17a2b8",
            borderRadius: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "#0c5460", mb: 0.5 }}
          >
            📄 Document Notice:
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#0c5460", lineHeight: 1.4 }}
          >
            {`
            ${irrelevantDocs.length} document(s) (${irrelevantDocs
              .map((d) => d.filename)
              .join(", ")}) 
            were not analyzed as they don't appear to be related to UK legal matters. 
            Response based on ${validDocs.length} relevant document(s).`}
          </Typography>
        </Box>
      );
    }

    // Processing errors
    if (errorDocs.length > 0) {
      return (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "#f8d7da",
            borderLeft: "4px solid #dc3545",
            borderRadius: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "#721c24", mb: 0.5 }}
          ></Typography>
          <Typography
            variant="body2"
            sx={{ color: "#721c24", lineHeight: 1.4 }}
          >
            {errorDocs.length} document(s) could not be processed:{" "}
            {errorDocs.map((d) => d.filename).join(", ")}
          </Typography>
        </Box>
      );
    }

    return null;
  };

  // Get status icon for document chips
  const getDocumentIcon = (docResult) => {
    if (docResult.processed === null && docResult.irrelevant === null) {
      return <AccessTime />;
    }

    if (docResult.processed) {
      return <CheckCircle />;
    } else if (docResult.irrelevant) {
      return <Warning />;
    } else {
      return <Error />;
    }
  };
  const getDocumentIconColor = (docResult) => {
    if (docResult.processed === null && docResult.irrelevant === null)
      return "#9e9e9e";
    if (docResult.processed) return "#4caf50"; // green
    if (docResult.irrelevant) return "#ff9800"; // orange
    return "#f44336"; // red
  };

  const getChipColor = (docResult) => {
    if (docResult.processed === null && docResult.irrelevant === null) {
      return {
        bgcolor: "#eeeeee",
        color: "#616161",
        border: "1px solid #9e9e9e",
      };
    } else if (docResult.processed) {
      return {
        bgcolor: "#e8f5e8",
        color: "#2e7d32",
        border: "1px solid #4caf50",
      };
    } else if (docResult.irrelevant) {
      return {
        bgcolor: "#fff3e0",
        color: "#f57c00",
        border: "1px solid #ff9800",
      };
    } else {
      return {
        bgcolor: "#ffebee",
        color: "#d32f2f",
        border: "1px solid #f44336",
      };
    }
  };

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
      key={index}
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
                flexShrink: 0,
              }}
            >
              <Image src={"/chat_icon.png"} alt="logo" width={24} height={24} />
            </Avatar>
          )}

          <Box sx={{ flex: 1 }}>
            {/* User Document Status */}
            {!isAI && hasDocuments && (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                    color: "#1e3c72",
                  }}
                >
                  <Attachment sx={{ fontSize: 16 }} />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, fontSize: 13 }}
                  >
                    {documentCount} document{documentCount > 1 ? "s" : ""}{" "}
                    uploaded:
                  </Typography>
                </Box>

                {/* Enhanced Document Chips with Status */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                  {documentResults.length > 0
                    ? // Show results with status icons
                      documentResults.map((docResult, index) => (
                        <Tooltip
                          key={index}
                          title={
                            docResult.processed
                              ? `Processed: ${
                                  docResult.documentType || "Legal document"
                                }`
                              : docResult.irrelevant
                              ? " Not related to UK legal matters"
                              : `Processing failed: ${docResult.error}`
                          }
                        >
                          <Chip
                            icon={getDocumentIcon(docResult)}
                            label={docResult.filename}
                            size="small"
                            variant="outlined"
                            sx={{
                              maxWidth: 180,
                              fontSize: "11px",
                              height: "26px",
                              ...getChipColor(docResult),
                              "& .MuiChip-label": {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                paddingLeft: "4px",
                                paddingRight: "8px",
                              },
                              "& .MuiChip-icon": {
                                color: getDocumentIconColor(docResult), // apply color here
                                fontSize: "18px", // optional if you want larger icon
                                paddingX: "2px",
                              },
                            }}
                          />
                        </Tooltip>
                      ))
                    : // Fallback for old messages without documentResults
                      documentNames.map((name, index) => (
                        <Tooltip title={name} key={index}>
                          <Chip
                            label={name}
                            size="small"
                            sx={{
                              maxWidth: 180,
                              fontSize: "11px",
                              height: "26px",
                              bgcolor: "#1e3c72",
                              color: "#fff",
                              "& .MuiChip-label": {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              },
                            }}
                          />
                        </Tooltip>
                      ))}
                </Box>
              </Box>
            )}

            {/* Message Content */}
            <Markdown>{msg}</Markdown>

            {/* AI Document Feedback */}
            {getDocumentFeedback()}
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
            flexShrink: 0,
          }}
        >
          {initials}
        </Avatar>
      )}
    </Box>
  );
};

export default ChatItem;
