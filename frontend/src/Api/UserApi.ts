import { Methods, UserEndpoints } from "../Constants/ApiConstants";
import { AuthResult } from "../Model/AuthResult";
import { User } from "../Model/User";
import { createHeader } from "../Utilities/Utilities";

export const login = async (user: User) => {
  let url = UserEndpoints.login;
  const data: AuthResult = await fetch(url, createHeader(Methods.POST, user))
    .then(async (respose: Response) => {
      return await respose.json();
    })
    .then((result: AuthResult) => {
      return result;
    });

  if (data.result === false) {
    throw new Error(data.error!);
  }

  return data;
};

export const register = async (user: User) => {
  let url = UserEndpoints.register;
  let response = await (
    await fetch(url, createHeader(Methods.POST, user))
  ).json();
  return await response;
};
