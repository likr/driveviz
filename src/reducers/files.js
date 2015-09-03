import {
  BACK,
  FORWARD,
  LOAD_FILES
} from "../action-types";

const path = (file) => {
  if (file.parent) {
    return `${path(file.parent)}/${file.item ? file.item.title : file.title}`;
  }
  return "";
};

const fileReducer = (state={files: {}}, action) => {
  switch (action.type) {
    case BACK:
      return state.previous || state;
    case FORWARD:
      return {
        path: path(action.directory),
        files: action.directory,
        previous: state
      };
    case LOAD_FILES:
      return {
        path: "/",
        files: action.files
      };
    default:
      return state;
  }
};

export default fileReducer;
