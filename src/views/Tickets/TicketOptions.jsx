import React from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { fetchDepartments } from "../../api/department";
import { fetchDepartmentsFailure, fetchDepartmentsSuccess } from "../../actions/department";
import { Grid } from "material-ui";

import {
  Button
} from "components";
import TicketOption from "./TicketOption";

class TicketOptions extends React.Component {

  componentDidMount() {
    if (!this.props.allDepartments) {
      this.props.fetchDepartments();
    }
  }

  render() {

    const { allDepartments, ticketOptions, fields} = this.props;

    let allDepsChosen = false;

    ticketOptions.forEach((option) => {
      if (option.department === 0) {
        allDepsChosen = true;
      }
    });

    return (
      <Grid container>
        {
          allDepsChosen
            ? null
            : <Button color={"primary"} type="button" onClick={() => fields.push({})}>Add Option</Button>
        }

        {
          fields.map((option, index) => {
              if (allDepsChosen && ticketOptions[index].department === 0) {
                  return <TicketOption allDepartments={allDepartments} fields={fields} ticketOptions={ticketOptions} key={index} index={index} option={option}/>
              }
              else if (!allDepsChosen){
                return <TicketOption allDepartments={allDepartments} fields={fields} ticketOptions={ticketOptions} key={index} index={index} option={option}/>
              }
              else{
                return null
              }
            }
          )}
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchDepartments: () => {dispatch(fetchDepartments(fetchDepartmentsSuccess,fetchDepartmentsFailure))}
  }
}

function mapStateToProps(state){
  const ticketForm = formValueSelector('ticket_form');
  return {
    allDepartments: state.departments.departments,
    ticketOptions: ticketForm(state,'ticket_options')
  }
}

export default TicketOptions = connect(mapStateToProps,mapDispatchToProps)(TicketOptions);
