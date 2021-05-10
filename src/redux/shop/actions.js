import { ActionTypes } from "./types";

export const setCategories = (data) => ({
  type: ActionTypes.SET_CATEGORIES,
  payload: data,
});
export const setEmployee = (data) => ({
  type: ActionTypes.SET_EMPLOYEES,
  payload: data,
});
