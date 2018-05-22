import React from "react";
import { Grid } from "material-ui";
import { RegularCard,
  Table,
  ItemGrid,
  Button
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
import { PermissibleRender } from '@brainhubeu/react-permissible';

class Departments extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchDepartments();
  }

  departmentWithButtons = (department) => {
    const { id } = department;

    return [
      ...drop(values(department)),
      <div>
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
        />,
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
              cardTitle="Departments"
              cardSubtitle="Make changes to Departments"
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
function mapDispatchToProps (dispatch){
  return {
    openModal: (modalType, modalProps = null) => { dispatch({type: types.SHOW_MODAL, modalType: modalType, modalProps: modalProps}) },
    fetchDepartments: () => { dispatch(fetchDepartments(fetchDepartmentsSuccess,fetchDepartmentsFailure)) },
    onDeleteDepartment: deleteDepartment
  }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps)(Departments);

export default withConnect;
