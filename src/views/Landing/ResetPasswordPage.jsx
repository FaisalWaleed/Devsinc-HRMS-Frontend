import React from 'react';
import { Grid } from 'material-ui';
import logo from "assets/img/devsinc_logo.png";
import { Button,Muted, RegularCard, ItemGrid, CustomInputWrapper } from 'components';
import ResetPasswordForm from './ResetPasswordForm';

class ResetPasswordPage extends React.Component{
  
  handleResetPasswordSubmit(values){
    console.log(values);
  }
  
  render(){
    return (
      <Grid container>
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

export default ResetPasswordPage;