import React, { useContext, useEffect, useState } from "react";
import styles from "./PublicDestinations.module.css";
import { DestinationDto } from "../../Model/DestinationDto";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import {
  addToFavorite,
  getPublicDestinations,
  removeFromFavorite,
} from "../../Api/DestinationApi";
import { DestinationCard } from "../../Components/DestinationCard/DestinationCard";
import { AuthentificationContext } from "../../Context/AuthentificationContext";
import { toast } from "react-toastify";
export const PublicDestinations = () => {
  const [destinations, setDestinations] = useState<DestinationDto[]>();
  const { email } = useContext(AuthentificationContext);
  useEffect(() => {
    getPublicDestinations().then((x) => {
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                  padding: "10px",
                }}
              ></Box>
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
                      onFavoriteClick={async () => {
                        if (d.ownerEmail !== email) {
                          try {
                            if (d.isPublic === false) {
                              await addToFavorite(d.id);
                              const updatedList = destinations.map((dest) => {
                                return dest.id === d.id
                                  ? ({
                                      ...dest,
                                      isPublic: true,
                                      numberOfTimesFavorated:
                                        d.numberOfTimesFavorated + 1,
                                    } as DestinationDto)
                                  : dest;
                              });
                              setDestinations(updatedList);
                            } else {
                              await removeFromFavorite(d.id);
                              const updatedList = destinations.map((dest) => {
                                return dest.id === d.id
                                  ? ({
                                      ...dest,
                                      isPublic: false,
                                      numberOfTimesFavorated:
                                        d.numberOfTimesFavorated - 1,
                                    } as DestinationDto)
                                  : dest;
                              });
                              setDestinations(updatedList);
                            }
                          } catch (error) {
                            toast((error as Error).message, {
                              type: "error",
                            });
                          }
                        }
                      }}
                    ></DestinationCard>
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
