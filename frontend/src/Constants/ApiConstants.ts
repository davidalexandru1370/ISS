export const baseUrl = "http://localhost:5191/";
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
}

export const UserEndpoints: UserEndpoint = {
  login: baseUrl + userController + "login",
  register: baseUrl + userController + "register",
};
