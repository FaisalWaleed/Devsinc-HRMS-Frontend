import React from "react";
import { connect } from 'react-redux'
import RoleForm from './RoleForm';
import { createRole } from "api/role";
import { Redirect } from 'react-router';

import { createRoleSuccess, createRoleFailure } from "actions/role";

class NewRole extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values){
    const { dispatch } = this.props;

    dispatch(createRole(values, createRoleSuccess, createRoleFailure));
  }

  render(){
    return (
      this.props.roleCreated?
      <Redirect to='/roles'/> :
      <RoleForm onSubmit={this.handleSubmit} isNew />
    );
  }
}

// const mapDispatchToProps = {
//   createRole
// };
const mapStateToProps = ({roles: { roleCreated}}, props ) => ({
  roleCreated
});


export default connect(mapStateToProps, null)(NewRole);
