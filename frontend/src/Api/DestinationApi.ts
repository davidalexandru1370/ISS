import { DestinationEndpoints, Methods } from "../Constants/ApiConstants";
import { AddDestinationDto } from "../Model/AddDestinationDto";
import { DestinationDto } from "../Model/DestinationDto";
import { createHeader } from "../Utilities/Utilities";

export const addDestination = async (destination: AddDestinationDto) => {
  const url = DestinationEndpoints.addDestination;
  const header = createHeader(Methods.POST, destination);
  const data: DestinationDto = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((destination: DestinationDto) => {
      return destination;
    });

  return data;
};
