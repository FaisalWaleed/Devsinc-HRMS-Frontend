import React from 'react'
import { connect } from 'react-redux';
import {HIDE_MODAL} from "../../actions/modal";
import {
  CustomInput,
  CustomInputWrapper,
  DateRangePickerWrapper,
  ItemGrid,
  Danger,
  Button,
} from "components";
import { Grid } from 'material-ui';
import { Field, reduxForm } from 'redux-form';

class LeaveStatusForm extends React.Component{
  
  render(){
    const {error, handleSubmit, submitting, closeModal, submitText } = this.props;
    
    return(
      <form onSubmit={handleSubmit}>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={12}>
                <Field name="comment" required="required" autoComplete="reason" type="text" custominputprops={{labelText: 'Comment (optional)'}} component={CustomInputWrapper} />
                <Field name="status" required="required" autoComplete="status" type="hidden" component="input" />
              </ItemGrid>
            </Grid>
          </ItemGrid>
        </Grid>
        <br/>
        {error
          ? <Danger>{error}</Danger>
          : null
        }
        <div>
          <Button style={{float: 'right'}} disabled={submitting} onClick={() => {handleSubmit();closeModal()}} color="primary">{submitText}</Button>
          <Button style={{float: 'right'}} onClick={closeModal} disabled={submitting} color="primary">Cancel</Button>
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    closeModal: () => { dispatch(HIDE_MODAL) },
  }
}

LeaveStatusForm = reduxForm({
  form: 'leave_status_form'
})(LeaveStatusForm);

export default connect(null,mapDispatchToProps)(LeaveStatusForm);