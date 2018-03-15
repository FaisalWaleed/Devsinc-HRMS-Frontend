import React from "react";
import { Grid } from "material-ui";

import { RegularCard, 
  Table, 
  ItemGrid 
} from "components";

import { connect } from "react-redux";
import { 
  fetchDepartments, 
  deleteDepartment 
} from "api/department"
import { values, map, drop } from 'lodash';
import RegularButton from "components/CustomButtons/Button"
import { Link } from "react-router-dom";
import { Delete, Edit } from "material-ui-icons";

import { 
  fetchDepartmentsSuccess, 
  fetchDepartmentsFailure, 
  deleteDepartmentSuccess, 
  deleteDepartmentFailure 
} from "actions/department";

class Departments extends React.Component {
  componentDidMount() {
    // this.props.const { dispatch } = this.props;
    this.props.fetchDepartments(fetchDepartmentsSuccess, fetchDepartmentsFailure);
  }

  departmentWithButtons = (department) => {
    const { id } = department;

    return [
      ...drop(values(department)),
      <Delete onClick={() => this.props.onDeleteDepartment(id, deleteDepartmentSuccess, deleteDepartmentFailure)}/>, 
      <Link to={`/departments/edit/${id}`}><Edit /></Link>
    ];  
  }

  render() {
    const departments = map(this.props.departments, this.departmentWithButtons);

    return (
      <div>
        <RegularButton>
          <Link to="/departments/new">New Department</Link>
        </RegularButton>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Simple Table"
              cardSubtitle="Here is a subtitle for this table"
              content={
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Name", "Description", "Actions"]}
                  tableData={departments}
                />
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}
function mapStateToProps({ departments }) {
  return { 
    departments: departments.departments 
  };
}
const mapDispatchToProps = {
  fetchDepartments,
  onDeleteDepartment: deleteDepartment
};
const withConnect = connect(mapStateToProps, mapDispatchToProps)(Departments);

export default withConnect;
