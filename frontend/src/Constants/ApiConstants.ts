export const baseUrl = "http://localhost:5041/";
export const userController = "api/user/";
export const destinationController = "api/destination/";

const destinationBaseUrl = baseUrl + destinationController;
export enum Methods {
  POST = "POST",
  PUT = "PUT",
  GET = "GET",
  DELETE = "DELETE",
}

interface UserEndpoint {
  login: string;
  register: string;
  authorize: string;
}

interface DestinationEndpoint {
  addDestination: string;
  updateDestination: string;
  getDestinationsByUser: string;
  deleteDestination: string;
}

export const UserEndpoints: UserEndpoint = {
  login: baseUrl + userController + "authentificate",
  register: baseUrl + userController + "register",
  authorize: baseUrl + userController + "authorize",
};

export const DestinationEndpoints: DestinationEndpoint = {
  getDestinationsByUser: destinationBaseUrl + "get-by-user",
  addDestination: destinationBaseUrl + "add-destination",
  updateDestination: destinationBaseUrl + "update-destination",
  deleteDestination: destinationBaseUrl + "delete-destination",
};
