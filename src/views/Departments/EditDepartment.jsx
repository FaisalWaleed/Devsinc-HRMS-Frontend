import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DepartmentForm from './DepartmentForm';
import { 
  getDepartment, 
  updateDepartment 
} from "api/index";

import { getDepartmentSuccess, 
  getDepartmentFailure, 
  updateDepartmentSuccess, 
  updateDepartmentFailure 
} from "actions/department";

import { Redirect } from 'react-router';

class EditDepartment extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, departmentId } = this.props;
    dispatch(getDepartment(departmentId, getDepartmentSuccess, getDepartmentFailure ));
  }

  handleSubmit(values){
    const { dispatch, departmentId } = this.props;

    dispatch(updateDepartment(values, departmentId, updateDepartmentSuccess, updateDepartmentFailure));
  }

  render(){
    return (
        this.props.departmentUpdated? 
          <Redirect to="/departments" /> :
          <DepartmentForm onSubmit={this.handleSubmit}  />
    );
  }
}

const mapStateToProps = ({ departments: { departmentUpdated } }, { match: { params: { id } } }) => ({
  departmentId: id,
  departmentUpdated
});

const routed = withRouter(EditDepartment)

export default connect(mapStateToProps, null)(routed);
