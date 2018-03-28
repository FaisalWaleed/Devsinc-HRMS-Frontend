import request from "./request";

export const createDepartment = (params, successAction, failureAction) => {
    return request('admin/departments', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    }, successAction, failureAction);
};

export const fetchDepartments = (successAction, failureAction) => {
  return request('admin/departments', {}, successAction, failureAction);
}

export const deleteDepartment = (params, successAction, failureAction) => {
  return request(`admin/departments/${params}`, { method: 'DELETE' }, successAction, failureAction);
}

export const getDepartment = (id , successAction, failureAction) => {
  return request(`admin/departments/${id}`, {}, successAction, failureAction);
}

export const updateDepartment = (params, id, successAction, failureAction) => {
  return request(`admin/departments/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  }, successAction, failureAction);
}

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