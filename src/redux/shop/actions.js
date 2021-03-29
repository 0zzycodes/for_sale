import { ActionTypes } from "./types";

export const setCategories = (data) => ({
  type: ActionTypes.SET_CATEGORIES,
  payload: data,
});
