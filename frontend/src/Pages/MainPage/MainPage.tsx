import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  addToFavorite,
  deleteDestinationById,
  getDestinationByUser,
} from "../../Api/DestinationApi";
import { AreYouSureModal } from "../../Components/AreYouSureModal/AreYouSureModal";
import { DestinationModal } from "../../Components/DestinationModal/DestinationModal";
import { PrivateDestinationCard } from "../../Components/PrivateDestinationCard/PrivateDestinationCard";
import { DestinationDto } from "../../Model/DestinationDto";
import styles from "./mainpage.module.css";
import { toast } from "react-toastify";
const MainPage = () => {
  const [isDestinationModalOpen, setIsDestinationModalOpen] =
    useState<boolean>(false);

  const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] =
    useState<boolean>(false);

  const [destinations, setDestinations] = useState<DestinationDto[]>();

  const [selectedDestination, setSelectedDestination] =
    useState<DestinationDto>();

  useEffect(() => {
    getDestinationByUser().then((x) => {
      setDestinations(x);
    });
  }, []);

  return (
    <div className={styles.container}>
      {destinations === undefined ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <Typography>Loading data...</Typography>
        </Box>
      ) : (
        <>
          {
            <Box>
              <DestinationModal
                isOpen={isDestinationModalOpen}
                destination={selectedDestination}
                onSubmitClick={async (destination: DestinationDto) => {
                  let updatedDestinations;
                  if (selectedDestination !== undefined) {
                    updatedDestinations = destinations.map((d) => {
                      return d.id === destination.id ? destination : d;
                    });
                    setDestinations(updatedDestinations);
                  } else {
                    updatedDestinations = [...destinations, destination];
                  }
                  setDestinations(updatedDestinations);
                }}
                onClose={() => {
                  setSelectedDestination(undefined);
                  setIsDestinationModalOpen(false);
                }}
              />
              <AreYouSureModal
                isOpen={isAreYouSureModalOpen}
                onCancelClick={() => {
                  setIsAreYouSureModalOpen(false);
                }}
                onClose={() => {
                  setIsAreYouSureModalOpen(false);
                }}
                onOkClick={async () => {
                  await deleteDestinationById(selectedDestination!);
                  const updatedDestinations = destinations.filter(
                    (dest) => dest.id !== selectedDestination!.id
                  );
                  setSelectedDestination(undefined);
                  setDestinations(updatedDestinations);
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
                {destinations.map((d) => {
                  return (
                    <PrivateDestinationCard
                      destination={d}
                      onDeleteClick={() => {
                        setSelectedDestination(d);
                        setIsAreYouSureModalOpen(true);
                      }}
                      onUpdateClick={async () => {
                        setSelectedDestination(d);
                        setIsDestinationModalOpen(true);
                      }}
                      onFavoriteClick={async () => {
                        try {
                          await addToFavorite(d.id);
                        } catch (error) {
                          toast((error as Error).message, {
                            type: "error",
                          });
                        }
                      }}
                    />
                  );
                })}
              </Paper>
            </Box>
          }
        </>
      )}
    </div>
  );
};

export default MainPage;
