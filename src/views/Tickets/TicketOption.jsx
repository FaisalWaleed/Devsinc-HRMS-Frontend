import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import { Clear } from 'material-ui-icons';
import { Grid } from "material-ui";
import {
  CustomInput,
  ItemGrid
} from "components";
import { Field } from 'redux-form';
import ticketOptionStyle from './styles/ticketOptionStyle';
import { connect } from 'react-redux';
import {withStyles} from "material-ui/styles/index";
import {fetchTicketOption} from "../../api/ticket";
import {fetchTicketOptionFailure, fetchTicketOptionSuccess} from "../../actions/ticket";



class TicketOption extends React.Component{

  render(){

    const {classes, allDepartments, ticketOptions, ticketOptionsChosen, fields, index, option} = this.props;

    return (
      <Grid key={index} container>
        <ItemGrid xs={4} sm={4} md={4}>
          <Field name={`${option}.department_id`}
                 component={({input}) => (
                   <CustomInput
                     isSelect={true}
                     formControlProps={{
                       fullWidth: true
                     }}
                     labelText={"Department"}
                     inputProps={{
                       value: input.value,
                       onChange: (event) => {if(event.target.value){this.props.fetchTicketOption({id: event.target.value});}return input.onChange(event, event.target.value);},
                       required: "required",
                       name: input.name,
                       autoComplete: "department_id",
                     }}
                   >
                     <MenuItem value={0} key="all">
                       <ListItemText primary={"All Departments"}/>
                     </MenuItem>
                     {
                       allDepartments ?
                         allDepartments.map((department, index) => (
                             <MenuItem
                               key={index}
                               value={department.id}
                             >
                               <ListItemText primary={department.name}/>
                             </MenuItem>
                           )
                         )
                         : null
                     }
                   </CustomInput>
                 )
                 }
          >
          </Field>
        </ItemGrid>
        {ticketOptionsChosen[index].department_id !== 0 && ticketOptionsChosen[index].department_id != null ?
          <ItemGrid xs={3} sm={3} md={3}>
            <Field name={`${option}.role_id`} component={({input}) => (
              <CustomInput
                isSelect={true}
                formControlProps={{
                  fullWidth: true
                }}
                labelText={"Role"}
                inputProps={{
                  value: input.value,
                  onChange: (event) => input.onChange(event, event.target.value),
                  required: "required",
                  name: input.name,
                  autoComplete: "role_id",
                }}
              >
                <MenuItem value={0} key="all">
                  <ListItemText primary={"All Roles"}/>
                </MenuItem>
                {
                  ticketOptions[ticketOptionsChosen[index].department_id]
                    ? Object.values(ticketOptions[ticketOptionsChosen[index].department_id].roles).map((role,index) => (
                      <MenuItem
                        key={index}
                        value={role.role_id}
                      >
                        <ListItemText primary={role.role_name}/>
                      </MenuItem>
                    ))
                    : null
                }
              </CustomInput>
            )
            }
            >
            </Field>
          </ItemGrid> : null
        }
        {(ticketOptionsChosen[index].department_id !== 0 && ticketOptionsChosen[index].role_id !== 0 && ticketOptionsChosen[index].role_id != null) ?
          <ItemGrid xs={4} sm={4} md={4}>
            <Field name={`${option}.user_id`} component={({input}) => {
              input.value = input.value ? input.value : [];
              return <CustomInput
                isSelect={true}
                formControlProps={{
                  fullWidth: true
                }}
                labelText={"User"}
                inputProps={{
                  renderValue: selected => (
                    <div className={classes.chips}>
                      {selected.indexOf(0) !== -1
                        ? <Chip key={0} label={"All Users"} className={classes.chip}/>
                        : selected.map(value => <Chip key={value} label={ ticketOptions[ticketOptionsChosen[index].department_id].roles[ticketOptionsChosen[index].role_id].users[ticketOptions[ticketOptionsChosen[index].department_id].roles[ticketOptionsChosen[index].role_id].users.findIndex(user => user.id === value)].name } className={classes.chip}/>)}
                    </div>
                  ),
                  multiple: true,
                  value: input.value,
                  onChange: (event) => input.onChange(event, () => {
                    let options = event.target.options;
                    let selectedOptions = [];
                    if (options) {
                      for (let x = 0; x < options.length; x++) {
                        if (options[x].selected) {
                          selectedOptions.push(options[x].value);
                        }
                      }
                      return selectedOptions;
                    }
                  }),
                  required: "required",
                  name: input.name,
                  autoComplete: "user_id",
                }}
              >
                <MenuItem value={0} key="all">
                  <Checkbox checked={input.value.indexOf(0) !== -1}/>
                  <ListItemText primary={"All Users"}/>
                </MenuItem>
                {
                  ticketOptions[ticketOptionsChosen[index].department_id] ?
                    ticketOptions[ticketOptionsChosen[index].department_id].roles[ticketOptionsChosen[index].role_id] ?
                      ticketOptions[ticketOptionsChosen[index].department_id].roles[ticketOptionsChosen[index].role_id].users.map((user,index) => (
                          <MenuItem
                            key={index}
                            value={user.id}
                          >
                            <Checkbox checked={input.value.indexOf(user.id) !== -1 || input.value.indexOf(0) !== -1}/>
                            <ListItemText primary={user.name}/>
                          </MenuItem>
                        )
                      ) : null
                    :null
                }
              </CustomInput>
            }
            }
            >
            </Field>
          </ItemGrid> : null
        }
        <ItemGrid xs={1} sm={1} md={1}>
          <br/>
          <br/>
          {fields.length > 1 ?
            <Clear onClick={() => fields.remove(index)}/>
            : null
          }
        </ItemGrid>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchTicketOption: (params) => {dispatch(fetchTicketOption(params,fetchTicketOptionSuccess,fetchTicketOptionFailure))}
  }
}

function mapStateToProps(state){
  return {
    ticketOptions: state.tickets.ticketOptions
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(ticketOptionStyle)(TicketOption));
