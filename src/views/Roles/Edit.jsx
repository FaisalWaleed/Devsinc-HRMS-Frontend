import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import RoleForm from './RoleForm';
import { 
  getRole, 
  updateRole 
} from "api/role";

import { 
  getRoleSuccess, 
  getRoleFailure, 
  updateRoleSuccess, 
  updateRoleFailure 
} from "actions/role";

import { Redirect } from 'react-router';

class EditRole extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, roleId } = this.props;
    dispatch(getRole(roleId, getRoleSuccess, getRoleFailure ));
  }

  handleSubmit(values){
    const { dispatch, roleId } = this.props;

    dispatch(updateRole(values, roleId, updateRoleSuccess, updateRoleFailure));
  }

  render(){
    return (
        this.props.roleUpdated? 
          <Redirect to="/roles" /> :
          <RoleForm onSubmit={this.handleSubmit}  />
    );
  }
}

const mapStateToProps = ({ roles: { roleUpdated } }, { match: { params: { id } } }) => ({
  roleId: id,
  roleUpdated
});

const routed = withRouter(EditRole)

export default connect(mapStateToProps, null)(routed);
