import React from "react";
import { Grid } from "material-ui";
import { RegularCard,
  Table,
  ItemGrid,
  Button,
  Permissible
} from "components";
import { connect } from "react-redux";
import { fetchDepartments, deleteDepartment } from "../../api/department"
import { values, map, drop } from 'lodash';
import { Link } from "react-router-dom";
import { Delete, Edit } from "material-ui-icons";
import {
  fetchDepartmentsSuccess,
  fetchDepartmentsFailure,
  deleteDepartmentSuccess,
  deleteDepartmentFailure
} from "actions/department";
import * as types from "../../actions/actionTypes";
import {hasPermission} from "../../helpers/permissionsHelper";

class Departments extends React.Component {

  componentDidMount() {
    this.props.fetchDepartments();
  }

  departmentWithButtons = (department) => {
    const { id } = department;

    return [
      ...drop(values(department)),
      <div>
        <Permissible
          requiredPermissions={["departments_destroy"]}
        >
          <Delete
            onClick={
              this.props.openModal.bind(this,
                types.DELETE_MODAL,
                {
                  deleteAction: this.props.onDeleteDepartment(
                    id,
                    deleteDepartmentSuccess,
                    deleteDepartmentFailure
                  ),
                  resourceType: 'department'
                }
              )
            }
          />
        </Permissible>
        <Permissible
          requiredPermissions={["departments_update"]}
        >
          <Link style={{paddingLeft: '5px'}} to={`/departments/edit/${id}`}><Edit /></Link>
        </Permissible>
      </div>
    ];
  };

  render() {
    const departments = map(this.props.departments, this.departmentWithButtons);
    const { permissions } = this.props;

    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Departments"
              cardSubtitle="Make changes to Departments"
              content={
                <div>
                  <Permissible
                    requiredPermissions={["departments_create"]}
                  >
                    <Button color="primary">
                      <Link style={{color: 'white'}} to="/departments/new">New Department</Link>
                    </Button>
                  </Permissible>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Name", "Description", `${hasPermission(permissions,["departments_destroy","departments_update"],true) ? "Actions" : '' }`]}
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
function mapStateToProps(state) {
  return {
    departments: state.departments.departments,
    permissions: state.permissions.userPermissions
  };
}
function mapDispatchToProps (dispatch){
  return {
    openModal: (modalType, modalProps = null) => { dispatch({type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) },
    fetchDepartments: () => { dispatch(fetchDepartments(fetchDepartmentsSuccess,fetchDepartmentsFailure)) },
    onDeleteDepartment: deleteDepartment
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Departments);
