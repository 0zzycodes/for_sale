import { ActionTypes } from "./types";

const INITIAL_STATE = {
  currentCashier: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_CASHIER:
      return {
        ...state,
        currentCashier: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
