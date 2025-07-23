import { useState, useRef, useEffect } from "react";
import axios from "axios";

import HTTP_REQUEST from "@/lib/axiosConfig";

import { useAuth } from "@/context/AuthContext";

const useChat = () => {
  const { sessionId, setSessionId, removeSessionId } = useAuth();

  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const messagesEndRef = useRef(null);
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  // NEW: Document upload states
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (msg.trim() || selectedFiles.length > 0) {
        onMsgSend();
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 100); // small delay

    return () => clearTimeout(timeout);
  }, [chat]);

  useEffect(() => {
    if (sessionId) fetchDataForSession(sessionId);
    scrollToBottom();
  }, []);

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };

  // NEW: File handling functions
  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter((file) => {
      const extension = file.name.toLowerCase().split(".").pop();
      return ["pdf", "doc", "docx", "txt"].includes(extension);
    });

    if (validFiles.length !== files.length) {
      setToast({
        open: true,
        message:
          "Some files were rejected. Only PDF, DOC, DOCX, and TXT files are allowed.",
        severity: "warning",
      });
    }

    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // MODIFIED: Enhanced onMsgSend with database schema matching
  const onMsgSend = async (message, reloadMessage = false) => {
    if (msg !== "" || message !== "" || selectedFiles.length > 0) {
      const msgText = message || msg;

      // Create message object matching database schema
      const messageWithDocs = {
        _id: Date.now(), // Temporary ID
        type: "Human",
        msg:
          msgText ||
          `Analyze the uploaded document${selectedFiles.length > 1 ? "s" : ""}`,
        hasDocuments: selectedFiles.length > 0,
        documentNames: selectedFiles.map((f) => f.name),
        documentCount: selectedFiles.length,
        documentResults: selectedFiles.map((f) => ({
          filename: f.name,
          processed: null, // Will be updated from response
          irrelevant: null,
          documentType: null,
          error: null,
        })),
        irrelevantCount: 0,
        processedCount: 0,
        createdAt: new Date().toISOString(),
      };

      const finalChat = [...chat, messageWithDocs];
      !reloadMessage && setChat(finalChat);
      setLoading(true);
      setUploadProgress(selectedFiles.length > 0);

      // Create FormData for file upload
      const formData = new FormData();
      if (msgText) formData.append("msg", msgText);
      if (sessionId) formData.append("sessionId", sessionId);

      selectedFiles.forEach((file) => {
        formData.append("documents", file);
      });

      try {
        const response = await HTTP_REQUEST.post(`/chat`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // *** USE DATABASE SCHEMA OBJECTS DIRECTLY ***
        const newChat = [
          ...chat,
          response.data.userMessage, // Direct database object
          response.data.aiMessage, // Direct database object
        ];

        if (!sessionId) setSessionId(response.data.sessionId);
        setChat(newChat);
        scrollToBottom();
        setMsg("");
        setSelectedFiles([]);
        setReload(false);
      } catch (error) {
        setReload(true);
        if (axios.isAxiosError(error) && error.response) {
          setToast({
            open: true,
            message: error.response.data.error || error.message,
            severity: "error",
          });
        } else {
          setToast({ open: true, message: error.message, severity: "error" });
        }
      } finally {
        setLoading(false);
        setUploadProgress(false);
      }
    }
  };

  const fetchDataForSession = async (Id) => {
    if (sessionId !== Id) setSessionId(Id);
    setLoadingList(true);
    try {
      const response = await HTTP_REQUEST.get(`/chat?&sessionId=${Id}`);
      setChat(response?.data);
    } catch (error) {
      console.log("error", error);

      if (axios.isAxiosError(error) && error.response) {
        setToast({
          open: true,
          message: error.response.data.error || error.message,
          severity: "error",
        });
      } else {
        setToast({ open: true, message: error.message, severity: "error" });
      }
    } finally {
      scrollToBottom();
      setLoadingList(false);
      setLoading(false);
    }
  };

  const initiateNewChat = () => {
    removeSessionId();
    setChat([]);
    setMsg("");
    setSelectedFiles([]); // NEW: Clear files on new chat
    setLoading(false);
    setReload(false);
  };

  const handleReloadChat = () => {
    onMsgSend(msg, true);
  };

  return {
    chat,
    loading,
    onMsgSend,
    messagesEndRef,
    onStateChange,
    msg,
    handleKeyPress,
    fetchDataForSession,
    initiateNewChat,
    loadingList,
    toast,
    setToast,
    reload,
    handleReloadChat,
    setMsg,
    sessionId,
    selectedFiles,
    handleFileSelect,
    removeFile,
    uploadProgress,
  };
};

export default useChat;
