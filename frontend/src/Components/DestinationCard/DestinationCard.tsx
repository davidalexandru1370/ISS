import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { Box, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { DestinationDto } from "../../Model/DestinationDto";
import styles from "./DestinationCard.module.css";
import { AuthentificationContext } from "../../Context/AuthentificationContext";

export interface IDestinationCard {
  destination: DestinationDto;
  onFavoriteClick: () => void;
  children?: any;
}

const iconStyle = {
  cursor: "pointer",
  fontSize: "16px",
};

const favoriteIconClickStyle = {
  color: "red",
};

const moreVertIconStyle = {
  fontSize: "18px",
  color: "gray",
};

const destinationDetailsStyle = {
  fontSize: "13px",
};

export const DestinationCard: FC<IDestinationCard> = ({
  destination,
  onFavoriteClick,
  children,
}) => {
  const [favoriteIconStyle, setFavoriteIconStyle] = useState({
    position: "absolute",
    zIndex: 12,
    top: 0,
    right: 0,
    color: `${destination.isPublic === true ? "red" : "gray"}`,
    margin: "5px",
    fontSize: "24px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  });

  useEffect(() => {
    setFavoriteIconStyle({
      ...favoriteIconStyle,
      color: `${destination.isPublic === true ? "red" : "gray"}`,
    });
  }, [destination]);

  return (
    <div className={styles.container}>
      <FavoriteIcon
        sx={favoriteIconStyle}
        className={styles.favoriteIconStyle}
        onClick={async () => {
          await onFavoriteClick();
        }}
      />
      {children}
      <div className={styles.titleAndDescriptionContainer}>
        <img
          src={`${destination.imageUrl}`}
          className={styles.destinationImage}
        />
        <div className={styles.titleAndDescription}>
          <span>{destination.title}</span>
          <span className={styles.destinationDescription}>
            {destination.description}
          </span>
        </div>
      </div>
      <Box sx={{ marginTop: "10px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ ...destinationDetailsStyle, fontWeight: 600 }}>
            {destination.location}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <StarIcon sx={{ ...iconStyle, cursor: "default" }} />
            <Typography sx={destinationDetailsStyle}>
              {destination.numberOfTimesFavorated || 0}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <CalendarMonthIcon sx={iconStyle} />
            <Typography sx={destinationDetailsStyle}>
              &nbsp;{destination.startDate}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <CalendarMonthIcon sx={iconStyle} />
            <Typography sx={destinationDetailsStyle}>
              &nbsp;{destination.stopDate}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ ...destinationDetailsStyle, fontWeight: 800 }}>
            {destination.price} lei
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
