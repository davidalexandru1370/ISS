export const baseUrl = "http://localhost:5041/";
export const userController = "api/user/";

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

export const UserEndpoints: UserEndpoint = {
  login: baseUrl + userController + "authentificate",
  register: baseUrl + userController + "register",
  authorize: baseUrl + userController + "authorize",
};
