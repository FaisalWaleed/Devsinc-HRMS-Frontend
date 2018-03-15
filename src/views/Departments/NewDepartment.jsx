import React from "react";
import { connect } from 'react-redux'
import DepartmentForm from './DepartmentForm';
import { createDepartment } from "api/department";
import { Redirect } from 'react-router';

import { createDepartmentSuccess, createDepartmentFailure } from "actions/department";

class NewDepartment extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values){
    const { dispatch } = this.props;

    dispatch(createDepartment(values, createDepartmentSuccess, createDepartmentFailure));
  }

  render(){
    return (
      this.props.departmentCreated?
      <Redirect to='/departments'/> :
      <DepartmentForm onSubmit={this.handleSubmit} isNew />
    );
  }
}

// const mapDispatchToProps = {
//   createDepartment
// };
const mapStateToProps = ({departments: { departmentCreated}}, props ) => ({
  departmentCreated
});


export default connect(mapStateToProps, null)(NewDepartment);
