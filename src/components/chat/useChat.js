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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      msg.trim() && onMsgSend();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  useEffect(() => {
    if (sessionId) fetchDataForSession(sessionId);
    scrollToBottom();
  }, []);

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };

  const onMsgSend = async (message, reloadMessage = false) => {
    if (msg !== "" || message !== "") {
      const msgChat = [
        ...chat,
        {
          _id: chat.length + 1,
          type: "Human",
          msg: message || msg,
        },
      ];
      !reloadMessage && setChat(msgChat);
      setLoading(true);

      const obj = {
        msg: message || msg,
        ...(sessionId && { sessionId }),
        type: "Human",
        chat: chat,
      };

      try {
        const response = await HTTP_REQUEST.post(`/chat`, obj);

        const newChat = [
          ...msgChat,
          {
            _id: msgChat.length + 1,
            type: "AI",
            msg: response.data.msg,
          },
        ];

        if (!sessionId) setSessionId(response.data.sessionId);
        setChat(newChat);
        setMsg("");
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
      setLoadingList(false);
      setLoading(false);
    }
  };

  const initiateNewChat = () => {
    removeSessionId();
    setChat([]);
    setMsg("");
    setLoading(false);
    setReload(false);
  };

  const handleReloadChat = () => {
    console.log("inside reload handler", msg);

    // setReload(false);
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
    sessionId
  };
};

export default useChat;
