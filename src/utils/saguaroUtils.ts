import init, { InitOutput } from "saguaro_web";

let saguaroInstance: InitOutput;

export const loadSaguaro = () =>
  init()
    .then((result) => {
      saguaroInstance = result;
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });