import { ActionTypes } from "./types";

const INITIAL_STATE = {
  categories: [],
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
