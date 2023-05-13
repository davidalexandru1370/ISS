import { Button } from "@mui/material";
import { DestinationCard } from "../../Components/DestinationCard/DestinationCard";
import { useState } from "react";
import { DestinationModal } from "../../Components/DestinationModal/DestinationModal";

const MainPage = () => {
  const [isDestinationModalOpen, setIsDestinationModalOpen] =
    useState<boolean>(false);
  return (
    <div>
      <DestinationModal
        isOpen={isDestinationModalOpen}
        onSubmitClick={async () => {}}
        onClose={() => {
          setIsDestinationModalOpen(false);
        }}
      />
      <Button
        onClick={() => {
          setIsDestinationModalOpen(!isDestinationModalOpen);
        }}
      >
        Add destination
      </Button>
      <DestinationCard
        destination={{
          description: "Hai in vacante pe la saint tropez",
          id: "",
          title: "vacanta",
          imageUrl: "",
          location: "Nantes, Franta",
          ownerEmail: "da",
          price: 5000,
          startDate: "2023-07-07",
          stopDate: "2023-07-12",
        }}
        onDeleteClick={() => {}}
        onFavoriteClick={() => {}}
        onUpdateClick={() => {}}
      />
    </div>
  );
};

export default MainPage;
