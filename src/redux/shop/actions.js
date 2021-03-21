import { ActionTypes } from "./types";

export const setCurrentCashier = (cashier) => ({
  type: ActionTypes.SET_CURRENT_CASHIER,
  payload: cashier,
});
