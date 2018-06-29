import React from 'react';
import { Field,reduxForm } from 'redux-form'

import { Grid } from "material-ui";
import {
  RegularCard,
  Button,
  CustomInput,
  CustomInputWrapper,
  ItemGrid,
  Danger
} from "components";
import { connect } from "react-redux";
import {
  fetchDepartments
} from "api/department";
import {
  fetchDepartmentsSuccess,
  fetchDepartmentsFailure,
} from "actions/department";
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';


class RoleForm extends React.Component {
  
  componentDidMount() {
    this.props.fetchDepartments();
  }
  
  render() {
    const { error,handleSubmit, submitting, isNew, departments } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle={ isNew? "New Role" : "Edit Role" }
              content={
                <div>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <Field name="title" type="text" component={CustomInputWrapper} custominputprops={{labelText: "Title"}} />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <Field name="department_id"
                             component={({input}) => (
                               <CustomInput
                                 isSelect={true}
                                 formControlProps={{
                                   fullWidth: true
                                 }}
                                 labelText={"Department"}
                                 inputProps={{
                                   value: input.value,
                                   onChange: (event) => {if(event.target.value) return input.onChange(event, event.target.value);},
                                   required: "required",
                                   name: "department_id",
                                   autoComplete: "department_id",
                                 }}
                               >
                                 {
                                   departments ?
                                     departments.map((department, index) => (
                                         <MenuItem
                                           key={index}
                                           value={department.id}
                                         >
                                           <ListItemText primary={department.name} />
                                         </MenuItem>
                                       )
                                     )
                                     : null
                                 }
                               </CustomInput>
                             )
                             }
                      />
                    </ItemGrid>
                  </Grid>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={6}>
                      <Field name="description" type="text" component={CustomInputWrapper} custominputprops={{labelText: "Description"}} />
                    </ItemGrid>
                  </Grid>
                </div>
              }
              footer={
                <div>
                  {error
                    ? <Danger>{error}</Danger>
                    : null
                  }
                  <Button disabled={submitting} onClick={handleSubmit} style={{float: "right"}} color="primary">{isNew ? "Create" : "Save Changes"}</Button>
                </div>
              }
            />
          </ItemGrid>
        </Grid>
      </form>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchDepartments: () => { dispatch(fetchDepartments(fetchDepartmentsSuccess, fetchDepartmentsFailure)) }
})

function mapStateToProps({ departments, roles }) {
  return {
    departments: departments.departments,
    initialValues: roles.role
  };
}

RoleForm =  reduxForm({
  form: 'new_role'
})(RoleForm);

RoleForm = connect(mapStateToProps, mapDispatchToProps)(RoleForm)

export default RoleForm
