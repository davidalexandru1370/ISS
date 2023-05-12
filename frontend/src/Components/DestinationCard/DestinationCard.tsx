import React, { FC, useState } from "react";
import { DestinationDto } from "../../Model/DestinationDto";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./DestinationCard.module.css";
import StarIcon from "@mui/icons-material/Star";
import { Box, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
interface IDestinationCard {
  destination: DestinationDto;
  onUpdateClick: () => void;
  onDeleteClick: () => void;
  onFavoriteClick: () => void;
}

const iconStyle = {
  cursor: "pointer",
  fontSize: "15px",
};

const favoriteIconClickStyle = {
  color: "red",
};

const destinationDetailsStyle = {
  fontSize: "11px",
};

export const DestinationCard: FC<IDestinationCard> = ({
  destination,
  onDeleteClick,
  onFavoriteClick,
  onUpdateClick,
}) => {
  const [favoriteIconStyle, setFavoriteIconStyle] = useState({
    position: "absolute",
    zIndex: 10,
    top: 0,
    right: 0,
    color: "gray",
    margin: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  });

  return (
    <div className={styles.container}>
      <FavoriteIcon
        sx={favoriteIconStyle}
        className={styles.favoriteIconStyle}
        onClick={async () => {
          await onFavoriteClick();
          setFavoriteIconStyle({
            ...favoriteIconStyle,
            color: `${favoriteIconStyle.color === "red" ? "gray" : "red"}`,
          });
        }}
      />
      <div className={styles.titleAndDescriptionContainer}>
        <img
          src="https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/8ff2a532-e0cd-41a2-9164-554c4d9eb28a.jpeg?im_w=720"
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
            <Typography sx={destinationDetailsStyle}>0 </Typography>
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
          <Box sx={{ display: "flex", gap: "20px" }}>
            <DeleteForeverIcon sx={iconStyle} />
            <EditIcon sx={iconStyle} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};
