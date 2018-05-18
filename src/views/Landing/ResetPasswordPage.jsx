import React from 'react';
import { Grid } from 'material-ui';
import logo from "assets/img/devsinc_logo.png";
import { Button,Muted, RegularCard, ItemGrid, CustomInputWrapper } from 'components';
import ResetPasswordForm from './ResetPasswordForm';
import { connect } from 'react-redux';
import {resetPassword} from "../../api/user";
import {resetPasswordFailure, resetPasswordSuccess} from "../../actions/user";
import { Redirect } from 'react-router-dom';

class ResetPasswordPage extends React.Component{
  
  constructor(props){
    super(props);
    this.handleResetPasswordSubmit = this.handleResetPasswordSubmit.bind(this);
  }
  
  handleResetPasswordSubmit(values){
    console.log(values);
    this.props.resetPassword(values);
  }
  
  render(){
    
    let url = new URL(window.location.href);
    localStorage.clear();
    localStorage.setItem("access-token",url.searchParams.get('access-token'));
    localStorage.setItem("client",url.searchParams.get('client'));
    localStorage.setItem("uid",decodeURIComponent(url.searchParams.get('uid')));
    return (
      <Grid container>
        {
          this.props.success ? <Redirect to={"/dashboard"} /> : null
        }
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <img src={logo} />
            <Muted>Your Technology Partner</Muted>
          </ItemGrid>
        </Grid>
        <br /><br /><br /><br />
        <Grid container>
          <ItemGrid xs={8 } sm={8} md={8}>
            <RegularCard
              cardTitle="Welcome to Devsinc"
              cardSubtitle="Create your password and proceed!"
              content={
                <div>
                  <ResetPasswordForm onSubmit={this.handleResetPasswordSubmit}/>
                </div>
              }
            />
          </ItemGrid>
        </Grid>
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    resetPassword: (params) => {dispatch(resetPassword(params,resetPasswordSuccess,resetPasswordFailure))}
  }
}

function mapStateToProps(state){
  return {
    success: state.users.resetPasswordSuccess
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ResetPasswordPage);