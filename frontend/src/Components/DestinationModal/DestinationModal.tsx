import { Box, Button, Modal, TextField } from "@mui/material";
import React, { FC, useReducer, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DatePicker from "../DatePicker/DatePicker";
import { AddDestinationDto } from "../../Model/AddDestinationDto";
import { addDestination } from "../../Api/DestinationApi";

interface IDestinationModalProps {
  onSubmitClick: () => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

enum DestinationDispatchType {
  ADD,
}

interface DestinationDispatchAction {
  type: DestinationDispatchType;
  payload: Partial<AddDestinationDto>;
}
const handleDestinationDispatch = (
  state: AddDestinationDto,
  action: DestinationDispatchAction
) => {
  switch (action.type) {
    case DestinationDispatchType.ADD:
      return { ...state, ...action.payload };
  }
};

export const DestinationModal: FC<IDestinationModalProps> = ({
  isOpen,
  onClose,
  onSubmitClick,
}) => {
  const [destinationState, destinationDispatch] = useReducer(
    handleDestinationDispatch,
    {} as AddDestinationDto
  );

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
          onChange={(e) => {
            destinationDispatch({
              type: DestinationDispatchType.ADD,
              payload: { title: e.target.value },
            });
          }}
        ></TextField>
        <TextField
          label="Location"
          sx={textFieldStyle}
          onChange={(e) => {
            destinationDispatch({
              type: DestinationDispatchType.ADD,
              payload: { location: e.target.value },
            });
          }}
        ></TextField>
        <TextField
          label="Description"
          sx={textFieldStyle}
          onChange={(e) => {
            destinationDispatch({
              type: DestinationDispatchType.ADD,
              payload: { description: e.target.value },
            });
          }}
        ></TextField>
        <DatePicker
          label="Start date"
          onChange={(e) => {
            try {
              //@ts-ignore
              const date: string = (e.$d as Date).toISOString().split("T")[0];
              destinationDispatch({
                type: DestinationDispatchType.ADD,
                payload: {
                  startDate: date,
                },
              });
            } catch (error) {}
          }}
        />
        <DatePicker
          label="End date"
          onChange={(e) => {
            try {
              //@ts-ignore
              const date: string = (e.$d as Date).toISOString().split("T")[0];
              destinationDispatch({
                type: DestinationDispatchType.ADD,
                payload: {
                  startDate: date,
                },
              });
            } catch (error) {}
          }}
        />
        <TextField
          label="Price"
          type="number"
          sx={textFieldStyle}
          onChange={(e) => {
            destinationDispatch({
              type: DestinationDispatchType.ADD,
              payload: {
                price: parseInt(e.target.value),
              },
            });
          }}
        ></TextField>
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            if (event.target.files) {
              destinationDispatch({
                type: DestinationDispatchType.ADD,
                payload: {
                  destinationImage: event.target.files[0],
                },
              });
            }
          }}
        />
        <Button
          variant="contained"
          onClick={async () => {
            await addDestination(destinationState);
          }}
          sx={button}
        >
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

const textFieldStyle = {};
