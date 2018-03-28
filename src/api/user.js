import request from "./request";

export const fetchUsers = (successAction, failureAction) => {
    return request('admin/users', {}, successAction, failureAction);
};

export const editUser = (params, successAction, failureAction) => {
    return request(`admin/users/${params.id}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    },successAction,failureAction);
};

export const deleteUser = (userId,successAction,failureAction) => {
    return request(`admin/users/${userId}`,{
        method: 'DELETE',
    },successAction,failureAction);
}

export const getProfile = (id , successAction, failureAction) => {
  return request(`admin/users/${id}`, {}, successAction, failureAction);
}

export const updateProfile = (params, id, successAction, failureAction) => {
  return request(`admin/users/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  }, successAction, failureAction);
}