import React from "react";
import { connect } from 'react-redux'
import { signInUser } from "../../actions/auth/authConfig";
import SignInForm from './SignInForm';
import { SubmissionError } from 'redux-form';
import {fetchPermissions} from "../../api/permission";
import {fetchPermissionFailure, fetchPermissionSuccess} from "../../actions/permission";
import { isSignedin } from "../../helpers/permissionsHelper";
import { Redirect } from 'react-router-dom';

class Landing extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values){
    const {signInUser} = this.props;
    const {
      email,
      password,
    } = values;

    return signInUser({email, password})
      .then((data) => {
        this.props.fetchPermissions();
        this.props.history.push('/dashboard');
      })
      .catch((error) => {
        if(!error.response){
          throw new SubmissionError({
            _error: "Something went wrong. Please try again later."
          });
        }
        else{
          error.response.data.errors.forEach((error) => {
            throw new SubmissionError({
              _error: error
            })
          });
        }
      })
  }

  render(){
    return (
      isSignedin() ? window.location = "/"  : <SignInForm onSubmit={this.handleSubmit}  />
    );
  }

}

export default connect(null,{signInUser,fetchPermissions: () => fetchPermissions(fetchPermissionSuccess,fetchPermissionFailure)})(Landing);
