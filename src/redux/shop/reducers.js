import { ActionTypes } from "./types";

const INITIAL_STATE = {
  categories: [],
  employees: [],
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case ActionTypes.SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
