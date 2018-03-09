import React from "react";
import { connect } from 'react-redux'
import DepartmentForm from './DepartmentForm';
import { createDepartment } from "api/index";

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
      <DepartmentForm onSubmit={this.handleSubmit}  />
    );
  }
}

// const mapDispatchToProps = {
//   createDepartment
// };

export default connect(null, null)(NewDepartment);
