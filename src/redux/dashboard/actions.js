import { ActionTypes } from "./types";

export const setCurrentPage = (data) => ({
  type: ActionTypes.CURRENT_PAGE,
  payload: data,
});
export const setStep = (step) => ({
  type: ActionTypes.SET_STEP,
  payload: step,
});
export const setShowVerifyEmail = (status) => ({
  type: ActionTypes.SHOW_VERIFY_EMAIL,
  payload: status,
});
