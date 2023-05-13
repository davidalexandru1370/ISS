import { Box, Button, List, Paper } from "@mui/material";
import { DestinationCard } from "../../Components/DestinationCard/DestinationCard";
import { useState } from "react";
import { DestinationModal } from "../../Components/DestinationModal/DestinationModal";
import styles from "./mainpage.module.css";
import { AddDestinationDto } from "../../Model/AddDestinationDto";
import { DestinationDto } from "../../Model/DestinationDto";
const MainPage = () => {
  const [isDestinationModalOpen, setIsDestinationModalOpen] =
    useState<boolean>(false);

  const [selectedDestination, setSelectedDestination] =
    useState<DestinationDto>();

  return (
    <div className={styles.container}>
      <DestinationModal
        isOpen={isDestinationModalOpen}
        destination={selectedDestination}
        onSubmitClick={async () => {}}
        onClose={() => {
          setSelectedDestination(undefined);
          setIsDestinationModalOpen(false);
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          width: "100%",
          padding: "10px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setIsDestinationModalOpen(!isDestinationModalOpen);
          }}
        >
          Add destination
        </Button>
      </Box>
      <Paper
        className={styles.content}
        sx={{
          height: "100%",
          maxHeight: "91vh",
          overflow: "auto",
          boxShadow: 0,
        }}
      >
        {Array.from(Array(10)).map(() => {
          const destination: DestinationDto = {
            description: "Hai in vacante pe la saint tropez",
            id: "",
            title: "vacanta",
            imageUrl: "",
            location: "Nantes, Franta",
            ownerEmail: "da",
            price: 5000,
            startDate: "2023-07-07",
            stopDate: "2023-07-12",
          };
          return (
            <DestinationCard
              destination={destination}
              onDeleteClick={() => {}}
              onFavoriteClick={() => {}}
              onUpdateClick={() => {
                setSelectedDestination(destination);
                setIsDestinationModalOpen(true);
              }}
            />
          );
        })}
      </Paper>
    </div>
  );
};

export default MainPage;
