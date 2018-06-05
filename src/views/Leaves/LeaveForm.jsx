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
import { Field, Fields, reduxForm, getFormValues } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import * as moment from 'moment';
import { validateLeaveForm as validate, required } from './validateLeaveForm';

class LeaveForm extends React.Component{
  componentWillReceiveProps(nextProps){
    console.log(nextProps.values);
  }
  
  render(){
    const {error, handleSubmit, submitting, closeModal, formValues } = this.props;
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
    
    const renderError = ({input, meta, ...props}) => (
      meta.touched ?
        <Danger {...props} className='error'>{meta.error}</Danger>
        :null
    );
    
    return(
      <form onSubmit={handleSubmit}>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={12}>
                <Field validate={[required]} name="reason" required="required" autoComplete="reason" type="text" custominputprops={{labelText: 'Reason'}} component={CustomInputWrapper} />
              </ItemGrid>
            </Grid>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={12}>
                <Field name="leave_type"
                       validate={[required]}
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
                           <MenuItem value={"annual"} key={0}>
                             <ListItemText primary={"Annual"} />
                           </MenuItem>
                           <MenuItem value={"sick"} key={1}>
                             <ListItemText primary={"Sick"}/>
                           </MenuItem>
                           <MenuItem value={"compensation"} key={2}>
                             <ListItemText primary={"Compensation"}/>
                           </MenuItem>
                         </CustomInput>
                       )}
                >
                </Field>
                {
                  formValues ? formValues.leave_type === "sick"
                    ? <Danger>* you are required to provide medical certificate/prescription within 14 days</Danger>
                    : null : null
                }
                {
                  formValues ? formValues.leave_type === "compensation"
                    ? <Danger>* you are required to provide death certificate within 30 days</Danger>
                    : null : null
                }
                <Field name='leave_type' component={renderError} />
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
                <Field name='start_date' component={renderError} />
              </ItemGrid>
            </Grid>
          </ItemGrid>
        </Grid>
        <br/>
        <div>
          <Button style={{float: 'right'}} disabled={submitting} onClick={() => {handleSubmit();}} color="primary">Apply For Leave</Button>
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

function mapStateToProps(state){
  return {
    formValues: getFormValues('leave_form')(state)
  }
}

LeaveForm = reduxForm({
  form: 'leave_form',
  validate
})(LeaveForm);

export default LeaveForm = connect(mapStateToProps,mapDispatchToProps)(LeaveForm);