import { addDestination } from "../../Api/DestinationApi";
import { DestinationCard } from "../../Components/DestinationCard/DestinationCard";

const MainPage = () => {
  return (
    <div>
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
