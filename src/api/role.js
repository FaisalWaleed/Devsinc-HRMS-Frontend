import request from "./request";

export const createRole = (params, successAction, failureAction) => {
  return request('roles', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  }, successAction, failureAction);
}

export const fetchRoles = (successAction, failureAction) => {
  return request('roles', {}, successAction, failureAction);
}

export const deleteRole = (params, successAction, failureAction) => {
  return request(`roles/${params}`, { method: 'DELETE' }, successAction, failureAction);
}

export const getRole = (id , successAction, failureAction) => {
  return request(`roles/${id}`, {}, successAction, failureAction);
}

export const updateRole = (params, id, successAction, failureAction) => {
  return request(`roles/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  }, successAction, failureAction);
}