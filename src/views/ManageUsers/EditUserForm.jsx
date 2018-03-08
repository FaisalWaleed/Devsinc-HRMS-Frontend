import React from 'react';
import { Field,reduxForm } from 'redux-form'

import { Grid } from "material-ui";
import {
    CustomInput,
    ItemGrid,
} from "components";



let EditUserForm = props => {
    const { user,handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                    <Grid container>
                        <ItemGrid xs={4} sm={4} md={4}>
                            <Field name="id" type="text" component={({input,label,...custom}) =>
                                <CustomInput
                                    labelText="Id"
                                    id="id"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        ...input,
                                        ...custom,
                                        type: "text",
                                        required: "required",
                                        name: "id",
                                        autoComplete: "id",
                                        value: user.id,
                                        disabled: true
                                    }}
                                />
                            }
                            />
                        </ItemGrid>
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
                                        value: user.email
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
                                        autoComplete: "on",
                                        value: user.username ? user.username : ""
                                    }}
                                />
                            }
                            />
                        </ItemGrid>
                    </Grid>
                    <Grid container>
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
                                        value: user.name ? user.name : ""
                                    }}
                                />
                            }
                            />
                        </ItemGrid>
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
                                        value: user.company_id
                                    }}
                                />
                            }
                            />
                        </ItemGrid>
                    </Grid>
                </ItemGrid>
            </Grid>
        </form>
    )
};

export default reduxForm({
    form: 'edit_user'
})(EditUserForm);
