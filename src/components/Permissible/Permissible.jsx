import React from 'react';
import { hasPermission } from "../../helpers/permissionsHelper";
import { connect } from 'react-redux';

class Permissible extends React.Component{

  render(){
    const { userPermissions = [], requiredPermissions = [], atleastOne = false, children = null } = this.props;
    return(
      hasPermission(userPermissions,requiredPermissions,atleastOne) ?  {...children} : null
    )
  }
}

function mapStateToProps(state){
  return {
    userPermissions: state.permissions.userPermissions
  }
}

export default connect(mapStateToProps,null)(Permissible);