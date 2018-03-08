import * as resourceTypes from "./resourceTypes";
import userApi from "../api/userApi";
import {deleteUserSuccess, loadUsers} from "./userActions";

export function deleteResource(resourceType,resourceId) {
    if(resourceType === resourceTypes.USER){
        console.log("reached delete resource in resourceActions");
        return(dispatch) => {
            return userApi.deleteUser(resourceId).then( (response) => {
                dispatch(deleteUserSuccess(response));
                dispatch(loadUsers());
            }).catch(error => {
                throw(error);
            });
        }
    }
}