import React from "react";
import { Grid } from "material-ui";

import { RegularCard, Table, ItemGrid } from "components";

import { connect } from "react-redux";
import { fetchDepartments } from "api/index"
import _ from 'lodash';
import RegularButton from "components/CustomButtons/Button"
import { Link } from "react-router-dom";

import { fetchDepartmentsSuccess, fetchDepartmentsFailure } from "actions/department";

class Departments extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDepartments(fetchDepartmentsSuccess, fetchDepartmentsFailure));
  }

  render() {
    let departments = [];
    if (this.props.departments.departments) {
      departments = this.props.departments.departments.map(function(item){
        return _.values(item);
      })
    }
    return (
      <div>
        <RegularButton>
          <Link to="/newdepartment">New Department</Link>
        </RegularButton>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Simple Table"
              cardSubtitle="Here is a subtitle for this table"
              content={
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Name", "Description"]}
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
function mapStateToProps(state) {
  return { departments: state.departments };
}
// const mapDispatchToProps = dispatch => ({loadDeps: () => dispatch(departmentApi.loadDeps())})
const withConnect = connect(mapStateToProps, null)(Departments);

export default withConnect;
