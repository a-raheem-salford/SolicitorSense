import { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useAuth } from "@/context/AuthContext";

const useSidebar = ({ userId, sessionId }) => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const openAvatar = Boolean(anchorEl);
  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAvatar = () => {
    setAnchorEl(null);
    logout();
  };

  const [isOpen, setIsOpen] = useState(() => {
    // On first render, get from localStorage or decide based on screen size
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

  //   useEffect(() => {
  //     if (userId) {
  //       const fetchData = async () => {
  //         try {
  //           const response = await HTTP_REQUEST.get(
  //             `/chat/list?userId=${userId}`
  //           );
  //           setData(response.data);
  //         } catch (err) {
  //           setError(err);
  //         } finally {
  //           setLoading(false);
  //         }
  //       };

  //       fetchData();
  //     } else {
  //       setLoading(false);
  //     }
  //   }, [userId, sessionId]);

  useEffect(() => {
    // Optional: Adjust open state based on media query
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
  };
};

export default useSidebar;
