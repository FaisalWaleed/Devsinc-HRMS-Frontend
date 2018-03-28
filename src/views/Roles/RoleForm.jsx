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


let RoleForm = props => {
    const { error,handleSubmit, submitting, isNew } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Grid container>
                <ItemGrid xs={12} sm={12} md={8}>
                    <RegularCard
                        cardTitle={ isNew? "New Role" : "Edit Role" }
                        content={
                            <div>
                                <Grid container>
                                    <ItemGrid xs={4} sm={4} md={4}>
                                        <Field name="name" type="text" component={({input,label,...custom}) =>
                                            <CustomInput
                                                labelText="Role Name"
                                                id="name"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    ...input,
                                                    ...custom,
                                                    type: "text",
                                                    required: "required",
                                                    name: "name",
                                                    autoComplete: "on",
                                                }}
                                            />
                                        }
                                        />
                                    </ItemGrid>
                                </Grid>
                                <Grid container>
                                    <ItemGrid xs={4} sm={4} md={4}>
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
    )
};

RoleForm =  reduxForm({
    form: 'new_role'
})(RoleForm);

RoleForm = connect(
  state => ({
    initialValues: state.roles.role
  })
)(RoleForm)

export default RoleForm
