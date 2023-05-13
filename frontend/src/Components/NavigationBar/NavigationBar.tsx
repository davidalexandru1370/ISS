import { Box, Typography } from "@mui/material";
import React from "react";
import styles from "./navigationBar.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LogoutIcon from "@mui/icons-material/Logout";
import useCurrentPath from "../../Hooks/useCurrentPath";
import { useNavigate } from "react-router-dom";
const menuItemTypographyStyle = {
  fontSize: "14px",
  margin: "5px 0 0 5px",
};

const menuItemBoxStyle = {
  paddingBlock: "0.5rem",
  minWidth: "fit-content",
  borderRadius: "10px",
  width: "150px",
  paddingInline: "10px",
  display: "flex",
  cursor: "pointer",
};

const selectedBoxStyle = {
  backgroundColor: "red",
};

export const NavigationBar = () => {
  const path = useCurrentPath();
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <Box>
        <Typography sx={{ fontSize: "11px", color: "blue" }}>
          MAIN MENU
        </Typography>
        <Box
          sx={{
            ...menuItemBoxStyle,
            backgroundColor: `${path === "/mainpage" ? "grey" : ""}`,
          }}
          onClick={() => {
            navigate("/mainpage", {
              replace: true,
            });
          }}
        >
          <DashboardIcon sx={{ width: "12px" }} />
          <Typography sx={menuItemTypographyStyle}>My destinations</Typography>
        </Box>
        <Box
          sx={{
            ...menuItemBoxStyle,
            backgroundColor: `${path === "/publicDestinations" ? "grey" : ""}`,
          }}
          onClick={() => {
            navigate("/publicDestinations", {
              replace: true,
            });
          }}
        >
          <DashboardCustomizeIcon sx={{ width: "12px" }} />
          <Typography sx={menuItemTypographyStyle}>
            Public destinations
          </Typography>
        </Box>
      </Box>
      <Box sx={menuItemBoxStyle}>
        <LogoutIcon sx={{ width: "12px" }} />
        <Typography sx={menuItemTypographyStyle}>Log out</Typography>
      </Box>
    </div>
  );
};
