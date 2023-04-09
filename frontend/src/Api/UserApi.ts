import { Methods, UserEndpoints } from "../Constants/ApiConstants";
import { User } from "../Model/User";
import { createHeader } from "../Utilities/Utilities";

export const login = async (user: User) => {
  let url = UserEndpoints.login;
  return await (await fetch(url, createHeader(Methods.POST, user))).json();
};
