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
  let authResult = await fetch(url, createHeader(Methods.POST, user))
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((authResult: AuthResult) => {
      return authResult;
    });

  if (authResult.result === false) {
    throw new Error(authResult.error!);
  }
};

export const authorizeUser = async (): Promise<boolean> => {
  let url = UserEndpoints.authorize;
  let isAuthorized = await fetch(url, createHeader(Methods.GET)).then(
    (response: Response) => {
      if (response.status === 403) {
        return false;
      }
      return true;
    }
  );

  return isAuthorized;
};
