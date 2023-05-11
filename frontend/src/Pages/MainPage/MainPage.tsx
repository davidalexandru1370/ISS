import { addDestination } from "../../Api/DestinationApi";

const MainPage = () => {
  return (
    <div>
      <button
        onClick={async () => {
          await addDestination();
        }}
      >
        add
      </button>
    </div>
  );
};

export default MainPage;
