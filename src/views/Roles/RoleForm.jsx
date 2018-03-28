import React from 'react';
import { Field,reduxForm } from 'redux-form'

import { Grid } from "material-ui";
import {
    RegularCard,
    Button,
    CustomInput,
    ItemGrid,
    Danger
} from "components";
import { connect } from "react-redux";
import CustomSelect from 'components/CustomSelect';
import { 
  fetchDepartments 
} from "api/department";
import { 
  fetchDepartmentsSuccess, 
  fetchDepartmentsFailure, 
} from "actions/department";

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
                                        <ItemGrid xs={4} sm={4} md={4}>
                                            <Field name="title" type="text" component={({input,label,...custom}) =>
                                                <CustomInput
                                                    labelText="Role Title"
                                                    id="title"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        ...input,
                                                        ...custom,
                                                        type: "text",
                                                        required: "required",
                                                        name: "title",
                                                        autoComplete: "on",
                                                    }}
                                                />
                                            }
                                            />
                                        </ItemGrid>
                                        <ItemGrid xs={4} sm={4} md={4}>
                                            <Field 
                                                name="department_id" 
                                                component={CustomSelect}
                                                componentName="Department" 
                                                data={departments}
                                            />
                                        </ItemGrid>
                                    </Grid>
                                    <Grid container>
                                        <ItemGrid xs={6} sm={6} md={6}>
                                            <Field name="description" type="text" component={({input,label,...custom}) =>
                                                <CustomInput
                                                    labelText="Description"
                                                    id="description"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        ...input,
                                                        ...custom,
                                                        multiline: true,
                                                        rows: 3,
                                                        type: "text",
                                                        required: "required",
                                                        name: "description",
                                                        autoComplete: "on",
                                                    }}
                                                />
                                            }
                                            />
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
                                    <Button disabled={submitting} onClick={handleSubmit} style={{float: "right"}} color="primary">Create</Button>
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
    console.log("this is the role", roles);
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
