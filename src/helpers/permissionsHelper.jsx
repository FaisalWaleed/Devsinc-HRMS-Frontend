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