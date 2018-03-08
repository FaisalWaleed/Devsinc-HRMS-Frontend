import * as types from './actionTypes';
import userApi from '../api/userApi';

export function loadUsers(){
    return (dispatch) => {
        return userApi.getAllUsers().then((users) => {
            dispatch(loadUsersSuccess(users));
        }).catch((error) => {
            throw(error);
        })
    };
}

export function loadUsersSuccess(users) {
    return {type: types.LOAD_USERS_SUCCESS, payload: users};
}

export function deleteUserSuccess(response){
    return {type: types.DELETE_USER_SUCCESS, payload: response }
}
