import { Methods } from "../Constants/ApiConstants";

export const createHeader = (method: Methods, entity?: any) => {
  let headerOptions: RequestInit = {
    method: `${method}`,
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    credentials: "include",
  };

  if (entity !== undefined) {
    headerOptions = { ...headerOptions, body: JSON.stringify(entity) };
  }
  return headerOptions;
};

export const checkIfIsEmailValid = (email: string): boolean => {
  const pattern: RegExp = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  return pattern.test(email);
};
