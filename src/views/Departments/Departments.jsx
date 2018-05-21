import React from "react";
import { Grid } from "material-ui";

import { RegularCard,
  Table,
  ItemGrid,
  Button
} from "components";

import { connect } from "react-redux";
import {
  fetchDepartments,
  deleteDepartment
} from "../../api/department"
import { values, map, drop } from 'lodash';
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
      <div>
        <Delete onClick={() => this.props.onDeleteDepartment(id, deleteDepartmentSuccess, deleteDepartmentFailure)}/>
        <Link style={{paddingLeft: '5px'}} to={`/departments/edit/${id}`}><Edit /></Link>
      </div>
    ];
  };
  
  render() {
    const departments = map(this.props.departments, this.departmentWithButtons);
    
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Simple Table"
              cardSubtitle="Here is a subtitle for this table"
              content={
                <div>
                  <Button color="primary">
                    <Link style={{color: 'white'}} to="/departments/new">New Department</Link>
                  </Button>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Name", "Description", "Actions"]}
                    tableData={departments}
                  />
                </div>
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
