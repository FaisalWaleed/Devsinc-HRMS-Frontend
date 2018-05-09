import request from "./request";

export const fetchPermissions = (successAction,failureAction) => {
  return request('/permissions', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  },successAction,failureAction, true);
};
