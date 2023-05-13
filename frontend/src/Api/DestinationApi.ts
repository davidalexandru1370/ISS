import { DestinationEndpoints, Methods } from "../Constants/ApiConstants";
import { AddDestinationDto } from "../Model/AddDestinationDto";
import { DestinationDto } from "../Model/DestinationDto";
import { acceptMethods, createHeader } from "../Utilities/Utilities";

export const addDestination = async (destination: AddDestinationDto) => {
  const url = DestinationEndpoints.addDestination;
  let formData = new FormData();
  formData.append("DestinationImage", destination.destinationImage);
  formData.append("Title", destination.title);
  formData.append("Location", destination.location);
  formData.append("Description", destination.description);
  formData.append("Price", destination.price.toString());
  formData.append("StartDate", destination.startDate);
  formData.append("StopDate", destination.stopDate);

  const header = createHeader(Methods.POST, formData, acceptMethods.FORMDATA);
  const data: DestinationDto = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((destination: DestinationDto) => {
      return destination;
    });

  return data;
};

export const updateDestination = async (destination: DestinationDto) => {
  const url = DestinationEndpoints.updateDestination;
  let header = createHeader(Methods.PUT, destination);
  const data: DestinationDto = await fetch(url, header)
    .then(async (response: Response) => {
      if (response.status >= 400) {
      }
      return await response.json();
    })
    .then((destination: DestinationDto | string) => {
      if (typeof destination === "string") {
        throw new Error(destination);
      }
      return destination;
    });

  return data;
};

export const getDestinationByUser = async () => {
  const url = DestinationEndpoints.getDestinationsByUser;
  const header = createHeader(Methods.GET);
  const data: DestinationDto[] = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((destinations: DestinationDto[]) => {
      return destinations;
    });

  return data;
};
