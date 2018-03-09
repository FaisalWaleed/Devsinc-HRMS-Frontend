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



let DepartmentForm = props => {
    const { error,handleSubmit, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Grid container>
                <ItemGrid xs={12} sm={12} md={8}>
                    <RegularCard
                        cardTitle="New Department"
                        content={
                            <div>
                                <Grid container>
                                    <ItemGrid xs={12} sm={12} md={12}>
                                        <Field name="name" type="text" component={({input,label,...custom}) =>
                                            <CustomInput
                                                labelText="Department Name"
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
                                    <ItemGrid xs={12} sm={12} md={12}>
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

export default reduxForm({
    form: 'new_department'
})(DepartmentForm);
