import React from 'react';
import { connect } from 'react-redux';
import { APP_ERROR_OCCURED } from "../../actions/error";
import { Grid } from 'material-ui';
import { ItemGrid } from 'components';

class ErrorBoundary extends React.Component{

  componentDidCatch(error, info){
    this.props.appErrorOccured();
  }

  render(){
    const { appError, children } = this.props;
    return(
      appError ?
        <Grid container>
          <ItemGrid xs={10} sm={10} md={10}>
            <h1>We apologize, Something went wrong!</h1>
          </ItemGrid>
        </Grid>
        : children
    )
  }
}

function mapStateToProps(state){
  return {
    appError: state.errors.appError
  }
}

function mapDispatchToProps(dispatch){
  return {
    appErrorOccured: () => {dispatch(APP_ERROR_OCCURED)}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorBoundary);