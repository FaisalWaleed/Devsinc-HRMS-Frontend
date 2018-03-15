import React from 'react';
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { fetchDepartments } from "../../api/department";
import { fetchDepartmentsFailure, fetchDepartmentsSuccess } from "../../actions/department";
import { Grid } from "material-ui";
import Checkbox from 'material-ui/Checkbox';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import {
  CustomInput,
  ItemGrid
} from "components";
import ticketOptionsStyle from './styles/ticketOptionsStyle';

class TicketOptions extends React.Component {

  componentDidMount(){
    if(!this.props.allDepartments){
      this.props.fetchDepartments();
    }
  }

  render() {
    const { classes, allDepartments, selectedDepartment, selectedRole } = this.props;

    const users = [
      'Oliver Hansen',
      'Van Henry',
      'April Tucker',
      'Ralph Hubbard',
      'Omar Alexander',
      'Carlos Abbott',
      'Miriam Wagner',
      'Bradley Wilkerson',
      'Virginia Andrews',
      'Kelly Snyder',
    ];

    const roles = [
      'Project Manager',
      'Software Engineer',
      'Principal Software Engineer',
      'Senior Resource',
    ];

    return (
      <Grid container>
        <ItemGrid xs={4} sm={4} md={4}>
          <Field name="department"
                 component={({input }) => (
                   <CustomInput
                     isSelect={true}
                     formControlProps={{
                       fullWidth: true
                     }}
                     labelText={"Department"}
                     inputProps={{
                       renderValue: selected => (
                         <div className={classes.chips}>
                           <Chip key={selected} label={selected}
                                 className={classes.chip}/>
                         </div>
                       ),
                       value: input.value,
                       onChange: (event) => input.onChange(event,event.target.value),
                       required: "required",
                       name: input.name,
                       autoComplete: "department",
                     }}
                   >
                     <MenuItem value="All Departments" key="all">
                       <ListItemText primary={"All Departments"}/>
                     </MenuItem>
                     {
                       allDepartments ?
                         allDepartments.map((department, index) => (
                             <MenuItem
                               key={index}
                               value={department.name}
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
        {selectedDepartment !== "All Departments" ?
          <ItemGrid xs={3} sm={3} md={3}>
            <Field name="role" component={({input, ...custom}) => (
              <CustomInput
                isSelect={true}
                formControlProps={{
                  fullWidth: true
                }}
                labelText={"Role"}
                inputProps={{
                  renderValue: selected => (
                    <div className={classes.chips}>
                      <Chip key={selected} label={selected}
                            className={classes.chip}/>
                    </div>
                  ),
                  value: input.value,
                  onChange: (event) => input.onChange(event, event.target.value ),
                  required: "required",
                  name: input.name,
                  autoComplete: "role",
                }}
              >
                <MenuItem value="All Roles" key="all">
                  <ListItemText primary={"All Roles"}/>
                </MenuItem>
                {
                  roles.map(name => (
                      <MenuItem
                        key={name}
                        value={name}
                      >
                        <ListItemText primary={name}/>
                      </MenuItem>
                    )
                  )
                }
              </CustomInput>
            )
            }
            >
            </Field>
          </ItemGrid> : null
        }
        {(selectedDepartment !== "All Departments" && selectedRole !== "All Roles") ?
          <ItemGrid xs={5} sm={5} md={5}>
            <Field name="user" component={({input, ...custom}) => {
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
                      {selected.map(value => <Chip key={value} label={value}
                                                   className={classes.chip}/>)}
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
                  autoComplete: "user",
                }}
              >
                <MenuItem value="All Users" key="all">
                  <Checkbox checked={input.value.indexOf("All Users") !== -1}/>
                  <ListItemText primary={"All Users"}/>
                </MenuItem>
                {
                  users.map(name => (
                      <MenuItem
                        key={name}
                        value={name}
                      >
                        <Checkbox checked={input.value.indexOf(name) !== -1}/>
                        <ListItemText primary={name}/>
                      </MenuItem>
                    )
                  )
                }
              </CustomInput>
            }
            }
            >
            </Field>
          </ItemGrid> : null
        }
      </Grid>
    )
  };
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
    selectedDepartment: ticketForm(state,'department'),
    selectedRole: ticketForm(state,'role'),
  }
}

export default TicketOptions = connect(mapStateToProps,mapDispatchToProps)(withStyles(ticketOptionsStyle)(TicketOptions));
