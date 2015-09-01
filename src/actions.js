import {
  BACK,
  FORWARD,
  LOAD_FILES
} from "./action-types";

export const back = () => {
  return {
    type: BACK
  };
};

export const forward = (directory) => {
  return {
    type: FORWARD,
    directory
  };
};

export const loadFiles = (files) => {
  return {
    type: LOAD_FILES,
    files
  };
};
