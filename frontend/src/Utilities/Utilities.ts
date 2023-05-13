import { Methods } from "../Constants/ApiConstants";

export const createHeader = (
  method: Methods,
  entity?: any,
  accept?: string
) => {
  let headerOptions: RequestInit = {
    method: `${method}`,
    mode: "cors",
    headers: {
      //Accept: accept !== undefined ? accept : "application/json",
      //"Content-type": accept !== undefined ? accept : "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    credentials: "include",
  };

  if (entity !== undefined) {
    headerOptions = { ...headerOptions, body: entity };
  }
  return headerOptions;
};

export const checkIfIsEmailValid = (email: string): boolean => {
  const pattern: RegExp = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  return pattern.test(email);
};
