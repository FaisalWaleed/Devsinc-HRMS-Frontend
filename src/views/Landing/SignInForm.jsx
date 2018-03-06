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



let SignInForm = props => {
    const { error,handleSubmit, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Grid container>
                <ItemGrid xs={12} sm={12} md={8}>
                    <RegularCard
                        cardTitle="Sign In"
                        content={
                            <div>
                                <Grid container>
                                    <ItemGrid xs={12} sm={12} md={12}>
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
                                                    autoComplete: "on",
                                                }}
                                            />
                                        }
                                        />
                                    </ItemGrid>
                                </Grid>
                                <Grid container>
                                    <ItemGrid xs={12} sm={12} md={12}>
                                        <Field name="password" type="password" component={({input,label,...custom}) =>
                                            <CustomInput
                                                labelText="Password"
                                                id="password"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    ...input,
                                                    ...custom,
                                                    type: "password",
                                                    required: "required",
                                                    name: "password",
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
                                <Button disabled={submitting} onClick={handleSubmit} style={{float: "right"}} color="primary">Sign In</Button>
                            </div>
                        }
                    />
                </ItemGrid>
            </Grid>
        </form>
    )
};

export default reduxForm({
    form: 'sign_in'
})(SignInForm);
