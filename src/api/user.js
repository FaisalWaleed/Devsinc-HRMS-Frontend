import request from "./request";

export const fetchUsers = (successAction, failureAction) => {
    return request('users', {}, successAction, failureAction);
};

export const editUser = (params, successAction, failureAction) => {
    return request(`users/${params.id}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    },successAction,failureAction);
};

export const deleteUser = (userId,successAction,failureAction) => {
    return request(`users/${userId}`,{
        method: 'DELETE',
    },successAction,failureAction);
}
