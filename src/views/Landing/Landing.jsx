import React from "react";
import { connect } from 'react-redux'
import { signInUser } from "../../actions/auth/authConfig";
import SignInForm from './SignInForm';
import { SubmissionError } from 'redux-form';

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
        // console.log(data.responseText);
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
      <SignInForm onSubmit={this.handleSubmit}  />
    );
  }
  
}

export default connect(null,{signInUser})(Landing);
