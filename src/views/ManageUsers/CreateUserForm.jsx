import React from 'react';
import { Field,reduxForm } from 'redux-form'

import { Grid } from "material-ui";
import {
    CustomInput,
    ItemGrid,
    Danger,
    Button,
} from "components";
import * as types from "../../actions/actionTypes";
import { connect } from 'react-redux';



let CreateUserForm = props => {
    const { error, handleSubmit, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                    <Grid container>
                        <ItemGrid xs={4} sm={4} md={4}>
                            <Field name="email" type="email" component={({input,label,...custom}) =>
                                <CustomInput
                                    labelText="Email Address"
                                    id="email"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "email",
                                        required: "required",
                                        name: "email",
                                        autoComplete: "email",
                                    }}
                                />
                            }
                            />
                        </ItemGrid>
                        <ItemGrid xs={4} sm={4} md={4}>
                            <Field name="username" type="text" component={({input,label,...custom}) =>
                                <CustomInput
                                    labelText="Username"
                                    id="username"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "required",
                                        name: "username",
                                        autoComplete: "username",
                                    }}
                                />
                            }
                            />
                        </ItemGrid>
                        <ItemGrid xs={4} sm={4} md={4}>
                            <Field name="name" type="text" component={({input,label,...custom}) =>
                                <CustomInput
                                    labelText="Name"
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
                                        autoComplete: "name",
                                    }}
                                />
                            }
                            />
                        </ItemGrid>
                    </Grid>
                    <Grid container>
                        <ItemGrid xs={4} sm={4} md={4}>
                            <Field name="company_id" type="number" component={({input,label,...custom}) =>
                                <CustomInput
                                    labelText="Company"
                                    id="company"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "text",
                                        name: "company_id",
                                        autoComplete: "company_id",
                                    }}
                                />
                            }
                            />
                        </ItemGrid>
                        <ItemGrid xs={4} sm={4} md={4}>
                            <Field name="department_id" type="number" component={({input,label,...custom}) =>
                                <CustomInput
                                    labelText="Department"
                                    id="department"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "text",
                                        name: "department_id",
                                        autoComplete: "department_id",
                                    }}
                                />
                            }
                            />
                        </ItemGrid>
                    </Grid>
                </ItemGrid>
            </Grid>
            <div>
                {error
                    ? <Danger>{error}</Danger>
                    : null
                }
                <br/>
                <Button onClick={props.handleClose ? props.handleClose : null} disabled={submitting} color="primary">Cancel</Button>
                <Button disabled={submitting} onClick={handleSubmit} color="primary">Create User</Button>
            </div>
        </form>
    )
};

function mapDispatchToProps(dispatch){
    return({
        handleClose: () => { dispatch({type: types.HIDE_MODAL}) }
    })
}

CreateUserForm = reduxForm({
    form: 'create_user'
})(CreateUserForm);


export default CreateUserForm = connect(null,mapDispatchToProps)(CreateUserForm);