import { ActionTypes } from "./types";

const INITIAL_STATE = {
  currentPage: "dashboard",
};

const DashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export default DashboardReducer;
