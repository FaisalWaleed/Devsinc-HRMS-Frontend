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

export const fetchPermissionsObject = (successAction,failureAction) => {
  return request('/permissions/get_permissions_obj', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  },successAction,failureAction, true);
};