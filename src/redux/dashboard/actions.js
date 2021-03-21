import { ActionTypes } from "./types";

export const setCurrentPage = (data) => ({
  type: ActionTypes.CURRENT_PAGE,
  payload: data,
});
