import React from "react";
import { Grid } from "material-ui";
import { connect } from 'react-redux'
import { signInUser } from "../../actions/auth/authConfig";

import {
    RegularCard,
    Button,
    CustomInput,
    ItemGrid,
    Danger
} from "components";

class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(){
        const { signInUser } = this.props;
        const {
            email,
            password,
        } = this.state;
        signInUser({ email, password })
            .then(() => {
                this.props.history.push('/dashboard');
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }

    render(){
        return (
            <div>
                <form>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={8}>
                            <RegularCard
                                cardTitle="Sign In"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Email Address"
                                                    id="email"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "email",
                                                        required: "required",
                                                        name: "email",
                                                        autoComplete: "on",
                                                        onChange: this.handleInputChange,
                                                    }}
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Password"
                                                    id="password"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "password",
                                                        required: "required",
                                                        name: "password",
                                                        autoComplete: "on",
                                                        onChange: this.handleInputChange,
                                                    }}
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                footer={
                                    <div>
                                        {this.state.errors.map(function (error,index) {
                                            return <Danger key={index}>{error}</Danger>
                                        })}
                                        <Button onClick={this.handleSubmit} style={{float: "right"}} color="primary">Sign In</Button>
                                    </div>
                                }
                            />
                        </ItemGrid>
                    </Grid>
                </form>
            </div>

        );
    }
}

export default connect(null,{signInUser})(Landing);
