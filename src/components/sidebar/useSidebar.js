import { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import HTTP_REQUEST from "@/lib/axiosConfig";

const useSidebar = ({ sessionId }) => {
  const theme = useTheme();
  const { user, logoutContext } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log({ sessionId, user });

  const [anchorEl, setAnchorEl] = useState(null);
  const openAvatar = Boolean(anchorEl);
  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAvatar = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logoutContext();
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("inside useeffect");

      setLoading(true);
      try {
        const response = await HTTP_REQUEST.get(`/chat/list`);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId]);

  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sidebarOpen");
      return stored !== null ? stored === "true" : window.innerWidth >= 768;
    }
    return true; // fallback SSR-safe
  });

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarOpen", newState.toString());
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const autoCollapse = () => {
        if (window.innerWidth < 768) {
          setIsOpen(false);
        }
      };
      autoCollapse();
      window.addEventListener("resize", autoCollapse);
      return () => window.removeEventListener("resize", autoCollapse);
    }
  }, []);

  return {
    data,
    loading,
    error,
    toggleSidebar,
    isOpen,
    setIsOpen,
    isMobile,
    anchorEl,
    openAvatar,
    handleClickAvatar,
    handleCloseAvatar,
    handleLogout,
    user,
  };
};

export default useSidebar;
