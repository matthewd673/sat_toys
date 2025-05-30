import init from "saguaro_web";

export const loadSaguaro = () =>
  init()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .then((_result) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });