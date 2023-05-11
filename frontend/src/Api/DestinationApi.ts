export const addDestination = async () => {
  await fetch("http://localhost:5041/api/destination/add-destination", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",

      credentials: "include",
    },
  });
};
