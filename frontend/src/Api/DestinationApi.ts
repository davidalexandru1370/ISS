import { DestinationEndpoints, Methods } from "../Constants/ApiConstants";
import { AddDestinationDto } from "../Model/AddDestinationDto";
import { DestinationDto } from "../Model/DestinationDto";
import { createHeader } from "../Utilities/Utilities";

export const addDestination = async (destination: AddDestinationDto) => {
  const url = DestinationEndpoints.addDestination;
  let formData = new FormData();
  formData.append("DestinationImage", destination.DestinationImage);
  formData.append("Title", destination.Title);
  formData.append("Location", destination.Location);
  formData.append("Description", destination.Description);
  const header = createHeader(Methods.POST, formData, "multipart/form-data");
  const data: DestinationDto = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((destination: DestinationDto) => {
      return destination;
    });

  return data;
};

// export const addImage = async (image: File) => {
//   const url = DestinationEndpoints.addDestination;
//   let formData = new FormData();
//   formData.append("DestinationImage", destination.DestinationImage);
//   formData.append("Title", destination.Title);
//   const header = createHeader(Methods.POST, formData, "multipart/form-data");
//   const data: DestinationDto = await fetch(url, header)
//     .then(async (response: Response) => {
//       return await response.json();
//     })
//     .then((destination: DestinationDto) => {
//       return destination;
//     });

//   return data;
// };
