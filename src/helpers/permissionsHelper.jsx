import {difference, intersection} from "lodash";

export const hasPermission = (userPermissions = [], requiredPermissions = [], hasAnyOnePermission = false) => {
  if (!userPermissions || !requiredPermissions){
    return false
  }
  if(hasAnyOnePermission){
    return intersection(userPermissions, requiredPermissions).length;
  }
  return difference(requiredPermissions, userPermissions).length === 0;
};

export const isSignedin = () => {
  return ((localStorage.getItem('access-token') !== null) || (localStorage.getItem('uid') !== null) || (localStorage.getItem('client') !== null) )
};