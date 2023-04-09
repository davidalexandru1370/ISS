import { Methods, UserEndpoints } from "../Constants/ApiConstants";
import { User } from "../Model/User";
import { createHeader } from "../Utilities/Utilities";

export const login = async (user: User) => {
  let url = UserEndpoints.login;
  return await (await fetch(url, createHeader(Methods.POST, user))).json();
};

export const register = async (user: User) => {
  let url = UserEndpoints.register;
  let response = await (
    await fetch(url, createHeader(Methods.POST, user))
  ).json();
  return await response;
};
