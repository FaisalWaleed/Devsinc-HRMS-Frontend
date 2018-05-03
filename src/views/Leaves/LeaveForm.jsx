import React from 'react';
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
import { Field, Fields, reduxForm } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import * as moment from 'moment';

class LeaveForm extends React.Component{
  render(){
    const {error, handleSubmit, submitting, closeModal } = this.props;
    
    const renderDates = fields => (
      <DateRangePickerWrapper
        startDateFieldName="start_date"
        endDateFieldName="end_date"
        isOutsideRange={(day) => day < moment()}
        {...fields}
      />
    );
    
    const formatDates = (value) => {
      return moment(value);
    };
    
    return(
      <form onSubmit={handleSubmit}>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={12}>
                <Field name="reason" required="required" autoComplete="reason" type="text" custominputprops={{labelText: 'Reason'}} component={CustomInputWrapper} />
              </ItemGrid>
            </Grid>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={12}>
                <Field name="leave_type"
                       component={({input}) => (
                         <CustomInput
                           isSelect={true}
                           formControlProps={{
                             fullWidth: true
                           }}
                           labelText={"Type of Leave"}
                           inputProps={{
                             value: input.value,
                             onChange: (event) => {return input.onChange(event, event.target.value);},
                             required: "required",
                             name: input.name,
                             autoComplete: "leave_type",
                           }}
                         >
                           <MenuItem value={"sick"} key={0}>
                             <ListItemText primary={"Sick"} />
                           </MenuItem>
                           <MenuItem value={"emergency"} key={1}>
                             <ListItemText primary={"Emergency"}/>
                           </MenuItem>
                           <MenuItem value={"quota"} key={2}>
                             <ListItemText primary={"Quota"}/>
                           </MenuItem>
                           <MenuItem value={"personal"} key={3}>
                             <ListItemText primary={"Personal"}/>
                           </MenuItem>
                         </CustomInput>
                       )}
                >
                </Field>
              </ItemGrid>
            </Grid>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={12}>
                <br />
                <Fields
                  names={['start_date', 'end_date']}
                  component={renderDates}
                  format={formatDates}
                />
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
          <Button style={{float: 'right'}} disabled={submitting} onClick={() => {handleSubmit();closeModal()}} color="primary">Apply For Leave</Button>
          <Button style={{float: 'right'}} onClick={closeModal} disabled={submitting} color="primary">Cancel</Button>
        </div>
      </form>
    )
  }
}

function mapStateToProps(state){
  return {
  
  }
}

function mapDispatchToProps(dispatch){
  return {
    closeModal: () => { dispatch(HIDE_MODAL) },
  }
}

LeaveForm = reduxForm({
  form: 'leave_form'
})(LeaveForm);

export default LeaveForm = connect(mapStateToProps,mapDispatchToProps)(LeaveForm);