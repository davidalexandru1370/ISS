import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getDestinationByUser } from "../../Api/DestinationApi";
import { DestinationModal } from "../../Components/DestinationModal/DestinationModal";
import { DestinationDto } from "../../Model/DestinationDto";
import styles from "./mainpage.module.css";
import { DestinationCard } from "../../Components/DestinationCard/DestinationCard";
const MainPage = () => {
  const [isDestinationModalOpen, setIsDestinationModalOpen] =
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
          {destinations.length === 0 ? (
            <>
              <Typography>
                You have no created destinations. Start by creating pressing Add
                destination button
              </Typography>
            </>
          ) : (
            <>
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
                    <DestinationCard
                      destination={d}
                      onDeleteClick={() => {}}
                      onUpdateClick={() => {
                        setSelectedDestination(d);
                        setIsDestinationModalOpen(true);
                      }}
                      onFavoriteClick={() => {}}
                    />
                  );
                })}
              </Paper>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MainPage;
