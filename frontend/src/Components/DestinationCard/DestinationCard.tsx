import React, { FC, useState } from "react";
import { DestinationDto } from "../../Model/DestinationDto";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./DestinationCard.module.css";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface IDestinationCard {
  destination: DestinationDto;
  onUpdateClick: () => void;
  onDeleteClick: () => void;
  onFavoriteClick: () => void;
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
  onDeleteClick,
  onFavoriteClick,
  onUpdateClick,
}) => {
  const [favoriteIconStyle, setFavoriteIconStyle] = useState({
    position: "absolute",
    zIndex: 12,
    top: 0,
    right: 0,
    color: "gray",
    margin: "5px",
    fontSize: "24px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  });

  const [isDestinationActionsVisible, setIsDestinationActionsVisible] =
    useState<boolean>(false);
  const anchorRef = React.useRef<SVGSVGElement>(null);

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setIsDestinationActionsVisible(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setIsDestinationActionsVisible(false);
    } else if (event.key === "Escape") {
      setIsDestinationActionsVisible(false);
    }
  }

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

      <div style={{ position: "absolute" }}>
        <MoreVertIcon
          id="destination-button"
          ref={anchorRef}
          aria-controls={
            isDestinationActionsVisible ? "destination-menu" : undefined
          }
          aria-haspopup="true"
          sx={{
            ...favoriteIconStyle,
            left: 0,
            color: "gray",
            transition: "none",
          }}
          onClick={async () => {
            setIsDestinationActionsVisible(true);
          }}
        />
        <Popper
          sx={{ zIndex: 10 }}
          open={isDestinationActionsVisible}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={isDestinationActionsVisible}
                    id="destination-menu"
                    aria-labelledby="destination-button"
                  >
                    <MenuItem
                      onClick={(event) => {
                        handleClose(event);
                        onDeleteClick();
                      }}
                      sx={{ minWidth: "100px" }}
                    >
                      Delete
                    </MenuItem>
                    <MenuItem
                      onClick={(event) => {
                        handleClose(event);
                        onUpdateClick();
                      }}
                      sx={{ minWidth: "100px" }}
                    >
                      Update
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
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
        </Box>
      </Box>
    </div>
  );
};
