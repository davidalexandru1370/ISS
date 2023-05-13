import { Box, Button, Modal, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DatePicker from "../DatePicker/DatePicker";

interface IDestinationModalProps {
  onSubmitClick: () => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

export const DestinationModal: FC<IDestinationModalProps> = ({
  isOpen,
  onClose,
  onSubmitClick,
}) => {
  const handleOnClose = () => {
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box sx={style}>
        <ClearIcon
          sx={clearIconStyle}
          onClick={() => {
            handleOnClose();
          }}
        />
        <TextField
          label="Title"
          sx={textFieldStyle}
          onChange={(e) => {}}
        ></TextField>
        <TextField
          label="Location"
          sx={textFieldStyle}
          onChange={(e) => {}}
        ></TextField>
        <TextField
          label="Description"
          sx={textFieldStyle}
          onChange={(e) => {}}
        ></TextField>
        <DatePicker label="Start date" />
        <DatePicker label="End date" />
        <TextField
          label="Price"
          type="number"
          sx={textFieldStyle}
          onChange={(e) => {}}
        ></TextField>
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            if (event.target.files) {
              console.log(event.target.files[0]);
            }
          }}
        />
        <Button variant="contained" onClick={async () => {}} sx={button}>
          Add destination
        </Button>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  display: "flex",
  gap: "20px",
  flexDirection: "column",
  justifyContent: "space-between",
  top: "50%",
  left: "50%",
  minHeight: "35%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundImage: "linear-gradient(to bottom right, #0097b9, #8769ae)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const clearIconStyle = {
  cursor: "pointer",
  position: "absolute",
  top: 0,
  right: 0,
  color: "red",
};

const button = {
  backgroundColor: "chocolate",
  "&:hover": {
    backgroundColor: "chocolate",
  },
};

const textFieldStyle = {
  border: "2px solid white",
};
