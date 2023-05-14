export interface AddDestinationDto {
  description: string;
  location: string;
  title: string;
  startDate: string;
  stopDate: string;
  isPublic: boolean;
  price: number;
  destinationImage: File;
}
