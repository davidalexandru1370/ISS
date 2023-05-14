import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import styles from "./navigationBar.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LogoutIcon from "@mui/icons-material/Logout";
import useCurrentPath from "../../Hooks/useCurrentPath";
import { useNavigate } from "react-router-dom";
import { AuthentificationContext } from "../../Context/AuthentificationContext";
import { logout } from "../../Api/UserApi";
import PersonIcon from "@mui/icons-material/Person";
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

  const { username } = useContext(AuthentificationContext);

  return (
    <div className={styles.content}>
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            marginBottom: "20px",
            flexDirection: "column",
          }}
        >
          <PersonIcon sx={{ fontSize: "45px", marginLeft: "30%" }} />
          <Typography
            sx={{ fontSize: "18px", fontWeight: "100", marginLeft: "15%" }}
          >
            Hello, {username}
          </Typography>
        </Box>

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
      <Box sx={{ menuItemBoxStyle, flexDirection: "column" }}>
        <Box sx={{ display: "flex" }}>
          <LogoutIcon sx={{ width: "12px" }} />
          <Typography
            sx={menuItemTypographyStyle}
            onClick={async () => {
              await logout();
              console.log("aici");
              navigate("/login", {
                replace: true,
              });
            }}
          >
            Log out
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
