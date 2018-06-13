import request from "./request";

export const fetchTitles = (successAction, failureAction) => {
  return request('titles', {}, successAction, failureAction, true);
};