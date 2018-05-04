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
  StatsCard,
} from "components";
import { Grid } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import {  DateRange, FlightTakeoff} from "material-ui-icons/index";
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

class LeaveStatusForm extends React.Component{
  constructor(props){
    super(props);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.state = {
      status: 'approved'
    }
  }
  
  handleStatusChange(event){
    this.setState({
      status: event.target.value
    });
    this.props.change("status",event.target.value);
  }
  
  render(){
    const {error, handleSubmit, submitting, closeModal } = this.props;
    
    return(
      <form onSubmit={handleSubmit}>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <Grid container>
              <ItemGrid xs={4} sm={4} md={4}>
                <StatsCard
                  icon={FlightTakeoff}
                  iconColor="green"
                  title="This Year"
                  description="7"
                  small="Leaves"
                  statIcon={DateRange}
                  statText="This Year"
                />
              </ItemGrid>
              <ItemGrid xs={4} sm={4} md={4}>
                <StatsCard
                  icon={FlightTakeoff}
                  iconColor="orange"
                  title="This Month"
                  description="1"
                  small="Leaves"
                  statIcon={DateRange}
                  statText="This Month"
                />
              </ItemGrid>
              <ItemGrid xs={4} sm={4} md={4}>
                <StatsCard
                  icon={FlightTakeoff}
                  iconColor="red"
                  title="Quota"
                  description="7/14"
                  small="Leaves"
                  statIcon={DateRange}
                  statText="This Year"
                />
              </ItemGrid>
            </Grid>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={12}>
                <RadioGroup
                  aria-label="status"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleStatusChange}
                >
                  <FormControlLabel value="approved" control={<Radio />} label="Approve" />
                  <FormControlLabel value="rejected" control={<Radio />} label="Reject" />
                </RadioGroup>
                
                <Field name="comment" required="required" autoComplete="reason" type="text" custominputprops={{labelText: 'Comment (optional)'}} component={CustomInputWrapper} />
                <Field name="status" required="required" autoComplete="status" type="hidden" component="input" />
                <Field name="leave_id" required="required" autoComplete="leave_id" type="hidden" component="input" />
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
          <Button style={{float: 'right'}} disabled={submitting} onClick={() => {handleSubmit();closeModal()}} color="primary">Submit</Button>
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