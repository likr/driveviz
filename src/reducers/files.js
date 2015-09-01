import {
  BACK,
  FORWARD,
  LOAD_FILES
} from "../action-types";

const fileReducer = (state={files: {}}, action) => {
  switch (action.type) {
    case BACK:
      return state.previous || state;
    case FORWARD:
      return {
        files: action.directory,
        previous: state
      };
    case LOAD_FILES:
      return {
        files: action.files
      };
    default:
      return state;
  }
};

export default fileReducer;
