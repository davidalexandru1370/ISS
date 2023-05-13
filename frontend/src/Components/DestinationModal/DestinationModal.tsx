import { Box, Button, Modal, TextField } from "@mui/material";
import React, { FC, useEffect, useReducer, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DatePicker from "../DatePicker/DatePicker";
import { AddDestinationDto } from "../../Model/AddDestinationDto";
import { addDestination, updateDestination } from "../../Api/DestinationApi";
import { toast } from "react-toastify";
import { DestinationDto } from "../../Model/DestinationDto";

interface IDestinationModalProps {
  onSubmitClick: () => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
  destination?: DestinationDto;
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
  destination,
}) => {
  const [destinationState, destinationDispatch] = useReducer(
    handleDestinationDispatch,
    {} as AddDestinationDto
  );

  useEffect(() => {
    destinationDispatch({
      type: DestinationDispatchType.ADD,
      payload: {
        description: destination === undefined ? "" : destination.description,
        title: destination === undefined ? "" : destination.title,
        location: destination === undefined ? "" : destination.location,
        startDate: destination === undefined ? "" : destination.startDate,
        stopDate: destination === undefined ? "" : destination.stopDate,
        price: destination === undefined ? 0 : destination.price,
      },
    });
  }, [destination]);

  const handleOnClose = () => {
    onClose();
  };

  const validateDifferenceBetweenStartTimeAndEndTime = (): boolean => {
    return destinationState.startDate <= destinationState.stopDate;
  };

  const checkIfPriceIsNumber = (price: string) => {
    const numberPattern: RegExp = new RegExp(
      "(^(([1-9][0-9]*)|0)([.][0-9]+)?)"
    );

    return numberPattern.test(price);
  };

  const isDestinationValid = (): boolean => {
    return (
      destinationState.description === "" ||
      destinationState.title === "" ||
      destinationState.location === "" ||
      destinationState.startDate === "" ||
      destinationState.stopDate === "" ||
      (destination === undefined &&
        destinationState.destinationImage === undefined) ||
      checkIfPriceIsNumber(destinationState.price.toString()) === false
    );
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
          defaultValue={destination?.title}
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
          defaultValue={destination?.location}
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
          multiline
          defaultValue={destination?.description}
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
          defaultValue={new Date(destination?.startDate || "")}
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
          defaultValue={new Date(destination?.stopDate || "")}
          label="End date"
          onChange={(e) => {
            try {
              //@ts-ignore
              const date: string = (e.$d as Date).toISOString().split("T")[0];
              destinationDispatch({
                type: DestinationDispatchType.ADD,
                payload: {
                  stopDate: date,
                },
              });
            } catch (error) {}
          }}
        />
        <TextField
          label="Price"
          type="number"
          defaultValue={destination?.price}
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
        {destination === undefined && (
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
        )}
        <Button
          variant="contained"
          disabled={isDestinationValid()}
          onClick={async () => {
            if (destination === undefined) {
              try {
                await addDestination(destinationState);
                toast("Added succesfully", {
                  type: "success",
                });
              } catch (error) {
                toast((error as Error).message, {
                  type: "error",
                });
              }
            } else {
              try {
                await updateDestination({
                  ...destination,
                  ...destinationState,
                });
                toast("Updated succesfully", {
                  type: "success",
                });
              } catch (error) {
                toast((error as Error).message, {
                  type: "error",
                });
              }
            }
          }}
          sx={button}
        >
          {destination === undefined ? "Add destination" : "Update destination"}
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
