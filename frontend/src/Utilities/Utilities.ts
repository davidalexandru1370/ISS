import { Methods } from "../Constants/ApiConstants";

export enum acceptMethods {
  JSON = "application/json",
  FORMDATA = "multipart/form-data",
}

export const createHeader = (
  method: Methods,
  entity?: any,
  accept = acceptMethods.JSON
) => {
  let headerOptions: RequestInit = {
    method: `${method}`,
    mode: "cors",
    headers: {
      Accept: accept !== undefined ? accept : "application/json",
    },
    credentials: "include",
  };

  if (entity !== undefined) {
    headerOptions = {
      ...headerOptions,
      body: accept === acceptMethods.JSON ? JSON.stringify(entity) : entity,
    };
    if (accept === acceptMethods.JSON) {
      headerOptions = {
        ...headerOptions,
        headers: {
          ...headerOptions.headers,
          "Content-type": "application/json",
        },
      };
    }
  }
  return headerOptions;
};

export const checkIfIsEmailValid = (email: string): boolean => {
  const pattern: RegExp = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  return pattern.test(email);
};
