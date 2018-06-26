import React from 'react';
import { reduxForm, Form, Field, Fields } from 'redux-form';
import { SelectWrapper, ItemGrid, DateRangePickerWrapper, CustomInput, Button } from 'components';
import { connect } from 'react-redux';
import {fetchUsers} from "../../api/user";
import {fetchUsersFailure, fetchUsersSuccess} from "../../actions/user";
import { fetchDepartmentsSuccess, fetchDepartmentsFailure} from "../../actions/department";
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import moment from 'moment';
import { Grid } from 'material-ui';
import {fetchDepartments} from "../../api/department";

class TicketAdminSearchForm extends React.Component{
  
  componentDidMount(){
    this.props.fetchUsers();
    this.props.fetchDepartments();
  }
  
  render(){
    const { users, departments, handleSubmit } = this.props;
    const usersForSelect = users.map(user => (
      {
        value: user.id,
        label: user.name
      }
    ));
  
    const renderDates = fields => (
      <DateRangePickerWrapper
        startDateFieldName="start_date"
        endDateFieldName="end_date"
        isOutsideRange={(day) => false}
        block
        small
        {...fields}
      />
    );
  
    const formatDates = (value) => {
      return moment(value);
    };
    
    const statusOptions = [
      {value: "all", label: "All"},
      {value: "Open", label: "Open"},
      {value: "Closed", label: "Closed"},
      {value: "Completed", label: "Completed"}
    ];
  
    //Normalizers
    const onlyId = value => ( value ? value.value : '' );
  
    return(
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <Form onSubmit={handleSubmit}>
            <Grid container>
              <ItemGrid xs={12} sm={12} md={6}>
                <label>Created By</label>
                <Field
                  name="created_by"
                  normalize={onlyId}
                  component={SelectWrapper}
                  closeOnSelect={true}
                  removeSelected={true}
                  options={usersForSelect}
                />
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={6}>
                <label>Assigned To</label>
                <Field
                  name="assigned_to"
                  normalize={onlyId}
                  component={SelectWrapper}
                  closeOnSelect={true}
                  removeSelected={true}
                  options={usersForSelect}
                />
              </ItemGrid>
            </Grid>
            <br /><br />
            <Grid container>
              <ItemGrid xs={12} sm={12} md={4}>
                <label>Start Date / End Date</label>
                <Fields
                  names={['start_date', 'end_date']}
                  component={renderDates}
                  format={formatDates}
                />
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={4}>
                <Field name="department"
                       component={({input}) => (
                         <CustomInput
                           isSelect={true}
                           formControlProps={{
                             fullWidth: true,
                             style: {margin: '8px 0 0 0'}
                           }}
                           labelText={"Department"}
                           inputProps={{
                             value: input.value,
                             onChange: (event) => {return input.onChange(event, event.target.value);},
                             required: "required",
                             name: input.name,
                             autoComplete: "status",
                           }}
                         >
                           <MenuItem value={0} key={0}>
                             <ListItemText primary={"Sent To All"} />
                           </MenuItem>
                           {
                             departments.map((department,index) => (
                               <MenuItem value={department.id} key={index}>
                                 <ListItemText primary={department.name} />
                               </MenuItem>
                             ))
                           }
                         </CustomInput>
                       )}
                />
              </ItemGrid>
              <ItemGrid xs={12} sm={12} md={4}>
                <Field name="status"
                       component={({input}) => (
                         <CustomInput
                           isSelect={true}
                           formControlProps={{
                             fullWidth: true,
                             style: {margin: '8px 0 0 0'}
                           }}
                           labelText={"Status"}
                           inputProps={{
                             value: input.value,
                             onChange: (event) => {return input.onChange(event, event.target.value);},
                             required: "required",
                             name: input.name,
                             autoComplete: "status",
                           }}
                         >
                           {
                             statusOptions.map((option,index) => (
                               <MenuItem value={option.value} key={index}>
                                 <ListItemText primary={option.label} />
                               </MenuItem>
                             ))
                           }
                         </CustomInput>
                       )}
                />
                <Button style={{float: 'right'}} type="submit" color="primary">Search Tickets</Button>
              </ItemGrid>
            </Grid>
          </Form>
        </ItemGrid>
      </Grid>
    )
  }
}

function mapStateToProps(state){
  return {
    departments: state.departments.departments,
    users: state.users.allUsers
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchDepartments: () => { dispatch(fetchDepartments(fetchDepartmentsSuccess,fetchDepartmentsFailure)) },
    fetchUsers: () => { dispatch(fetchUsers(fetchUsersSuccess,fetchUsersFailure)) },
  }
}


TicketAdminSearchForm = reduxForm({
  form: 'ticket_admin_search_form'
})(TicketAdminSearchForm);

export default connect(mapStateToProps,mapDispatchToProps)(TicketAdminSearchForm);