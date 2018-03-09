import request from "./request";

export const createDepartment = (params, successAction, failureAction) => {
  return request('departments', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  }, successAction, failureAction);
}

export const fetchDepartments = (successAction, failureAction) => {
  return request('departments', {}, successAction, failureAction);
}
