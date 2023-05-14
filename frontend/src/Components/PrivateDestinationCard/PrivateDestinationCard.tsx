import React, { FC, useContext, useState } from "react";
import {
  DestinationCard,
  IDestinationCard,
} from "../DestinationCard/DestinationCard";
import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AuthentificationContext } from "../../Context/AuthentificationContext";

interface IPrivateDestinationCard extends IDestinationCard {
  onDeleteClick: () => void;
  onUpdateClick: () => void;
}

export const PrivateDestinationCard: FC<IPrivateDestinationCard> = ({
  destination,
  onDeleteClick,
  onFavoriteClick,
  onUpdateClick,
}) => {
  const [isDestinationActionsVisible, setIsDestinationActionsVisible] =
    useState<boolean>(false);
  const anchorRef = React.useRef<SVGSVGElement>(null);
  const { email } = useContext(AuthentificationContext);
  console.log(email);
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
    <div>
      <DestinationCard
        destination={destination}
        onFavoriteClick={onFavoriteClick}
      >
        {email.localeCompare(destination.ownerEmail) === 0 && (
          <div style={{ position: "absolute", top: 0, zIndex: 500 }}>
            <MoreVertIcon
              id="destination-button"
              ref={anchorRef}
              aria-controls={
                isDestinationActionsVisible ? "destination-menu" : undefined
              }
              aria-haspopup="true"
              sx={{
                cursor: "pointer",
                left: 0,
                color: "white",
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
                        onKeyDown={handleListKeyDown}
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
        )}
      </DestinationCard>
    </div>
  );
};
